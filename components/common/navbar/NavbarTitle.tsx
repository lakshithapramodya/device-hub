"use client";

import React from "react";

import { usePathname } from "next/navigation";
import { sidebarData } from "@/data/sidebar";

const NavbarTitle = () => {
  const pathname = usePathname();

  return (
    <h1 className="max-lg:hidden text-black text-lg font-medium">
      {sidebarData.find((item) => item.url === pathname)?.title ?? ""}
    </h1>
  );
};

export default NavbarTitle;
