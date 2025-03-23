"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../Logo";

import { cn } from "@/lib/utils";
import { sidebarData } from "@/data/sidebar";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-[240px] h-screen border-r border-gray-100 sticky left-0 top-0 bg-white z-50 max-lg:hidden overflow-y-auto hide-scrollbar">
      <div className="px-4 flex items-center h-16">
        <Logo className="text-lg" />
      </div>
      <div className="h-full flex flex-col justify-between w-full">
        <div className="flex flex-col items-center w-full gap-5 px-3">
          {sidebarData.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              className="w-full h-9 group"
              prefetch={false}
            >
              <span
                className={cn(
                  "flex flex-row gap-1.5 items-center text-base font-normal size-full rounded-lg px-2 text-nowrap",
                  pathname.split("/")[1] === item.url.split("/")[1]
                    ? "text-white bg-black"
                    : "text-black hover:opacity-50"
                )}
              >
                <item.icon
                  className={cn(
                    "size-[18px]",
                    item.icon,
                    pathname.split("/")[1] === item.url.split("/")[1]
                      ? "text-white"
                      : "text-black"
                  )}
                />
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
