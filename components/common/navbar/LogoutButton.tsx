"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { logout } from "@/lib/authentication";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center justify-center cursor-pointer"
      onClick={async () => {
        await logout();
        router.push("/sign-in");
      }}
    >
      <LogOut className="size-6 text-gray-700" />
    </button>
  );
};

export default LogoutButton;
