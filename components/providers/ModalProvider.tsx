"use client";

import React from "react";

import WarningModal from "@/components/common/WarningModal";
import SuccessModal from "@/components/common/SuccessModal";

const ModalProvider = () => {
  return (
    <>
      <WarningModal />
      <SuccessModal />
    </>
  );
};

export default ModalProvider;
