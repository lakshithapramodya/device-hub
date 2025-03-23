/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { SignJWT, jwtVerify } from "jose";
import { signIn } from "@/actions/auth";

const secretKey = process.env.JWT_SECRET || "secret123";
const key = new TextEncoder().encode(secretKey);

// Encrypt session
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8 hours")
    .sign(key);
}

// Decrypt session
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

// create session
export async function login(data: {
  email: string;
  password: string;
  isRemember?: boolean;
}) {
  const res = await signIn(data);

  if (res.status === "FAIL") {
    return res;
  }

  const user = {
    token: res.data?.access_token,
    refreshToken: res.data?.refresh_token,
  };

  // Create the session
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 8);
  const createdAt = new Date(Date.now());
  const session = await encrypt({ user, expires, createdAt });

  const cookieData = await cookies();

  cookieData.set("session-device-hub", session, {
    expires,
  });

  return res;
}

//logout
export async function logout() {
  // Destroy the session
  const cookieData = await cookies();

  cookieData.set("session-device-hub", "", { expires: new Date(0) });
}

export type Session = {
  user: {
    token: string;
    refreshToken: string | null;
  };
  expires: Date;
  createdAt: Date;
};

//get session
export async function getSession(): Promise<Session | null> {
  const sessionCookie = await cookies();

  const session = sessionCookie.get("session-device-hub")?.value;

  if (!session) return null;

  const decrypted = await decrypt(session);

  return decrypted;
}

// For middleware
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session-device-hub")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const response = NextResponse.next();

  return response;
}

// Update the access token and refresh token in the session
export const updateAccessTokenInSession = async (
  accessToken: string,
  refreshToken: string
) => {
  const session = await getSession();

  if (!session || !accessToken || !refreshToken) {
    return null;
  }

  session.user.token = accessToken;
  session.user.refreshToken = refreshToken;

  const expires = new Date(session.expires);
  const newSession = await encrypt(session);

  const cookieData = await cookies();

  cookieData.set("session-device-hub", newSession, { expires });

  console.log("Access token updated");

  return session;
};
