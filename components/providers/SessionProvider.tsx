"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  logout,
  updateAccessTokenInSession,
  type Session,
} from "@/lib/authentication";
import { refreshToken } from "@/actions/auth/refresh";

const SessionContext = createContext<{ session: Session | null } | undefined>(
  undefined
);

export const SessionProvider: React.FC<{
  children: React.ReactNode;
  session: Session | null;
}> = ({ children, session }) => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    if (!session?.user.refreshToken) return;

    // Refresh access token every 5 minutes
    const refreshAccessToken = () => {
      refreshToken(session?.user.refreshToken as string).then(
        async (response) => {
          if (response.status === "SUCCESS") {
            const res = await updateAccessTokenInSession(
              response.data?.token as string,
              response.data?.refreshToken as string
            );

            if (!res) {
              router.push("/sign-in");
            }
          } else {
            await logout();
            router.push("/sign-in");
          }
        }
      );
    };

    if (!mounted) {
      refreshAccessToken();
    }

    const intervalId = setInterval(refreshAccessToken, 5 * 60 * 1000);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context.session;
};
