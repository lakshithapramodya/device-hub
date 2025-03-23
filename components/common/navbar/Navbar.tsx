import React from "react";

import Logo from "../Logo";
import NavbarTitle from "./NavbarTitle";
import { LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-[50px] lg:h-12 2xl:h-16 bg-white px-4 lg:px-6 2xl:px-8 flex items-center justify-between lg:border-b border-gray-100 sticky top-0 z-50">
      <Logo className="lg:hidden" />
      <NavbarTitle />

      <button className="flex items-center justify-center cursor-pointer">
        <LogOut className="size-6 text-gray-700" />
      </button>
    </nav>
  );
};

export default Navbar;
