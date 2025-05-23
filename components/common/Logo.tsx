import React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("text-2xl font-bold", className)}>
      Device Hub
    </Link>
  );
};

export default Logo;
