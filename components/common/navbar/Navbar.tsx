import React from "react";

import Logo from "../Logo";
import NavbarTitle from "./NavbarTitle";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="h-[50px] lg:h-12 2xl:h-16 bg-white px-4 lg:px-6 2xl:px-8 flex items-center justify-between lg:border-b border-gray-100 sticky top-0 z-50">
      <Logo className="lg:hidden" />
      <NavbarTitle />

      <LogoutButton />
    </nav>
  );
};

export default Navbar;
