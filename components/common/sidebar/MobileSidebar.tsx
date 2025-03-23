"use client";

import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { sidebarData } from "@/data/sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center justify-between w-screen h-[60px] lg:hidden fixed bottom-0 z-50 bg-white">
      {sidebarData.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className={cn(
            "size-full w-1/3 group shrink-0 h-full flex flex-col justify-center items-center gap-0.5",
            pathname.split("/")[1] === item.url.split("/")[1]
              ? "text-white bg-black"
              : "text-gray-600"
          )}
          prefetch={false}
        >
          <item.icon
            className={cn(
              "size-6 shrink-0",
              item.icon,
              pathname.split("/")[1] === item.url.split("/")[1]
                ? "text-white"
                : "text-gray-600"
            )}
          />
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileSidebar;
