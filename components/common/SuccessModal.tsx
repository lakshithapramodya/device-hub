import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useSuccessModal } from "@/hooks/useSuccessModal";
import { CircleCheck } from "lucide-react";

const SuccessModal = () => {
  const { openSuccessModal, successData, setOpenSuccessModal, setSuccessData } =
    useSuccessModal();

  const handleClose = () => {
    setOpenSuccessModal(false);
    setSuccessData({
      title: "",
      backButtonText: "",
      function: () => {},
    });
  };

  return (
    <Dialog open={openSuccessModal} onOpenChange={handleClose}>
      <DialogContent className="gap-0 p-5 w-[320px] max-w-full">
        <CircleCheck className="size-14 text-green-500 mx-auto mt-10" />
        <p className="text-center text-[#757575] font-medium text-sm mt-5 text-wrap">
          {successData.title}
        </p>
        {successData.description && (
          <p className="text-center text-gray/70 text-sm mb-5 text-wrap">
            {successData.description}
          </p>
        )}
        <Button
          className="w-full bg-green-500 text-white h-10 text-base font-semibold rounded-[8px] mt-2.5"
          onClick={() => {
            successData.function();
            handleClose();
          }}
        >
          {successData.backButtonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
