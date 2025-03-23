import React from "react";

import CoverImage from "./CoverImage";
import LoginForm from "./LoginForm";

const LoginMain = () => {
  return (
    <section className="flex flex-col lg:flex-row h-screen items-center overflow-hidden">
      <CoverImage />
      <LoginForm />
    </section>
  );
};

export default LoginMain;
