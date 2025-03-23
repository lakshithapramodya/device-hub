import React, { useState } from "react";

import { Info, Loader2 } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWarningModal } from "@/hooks/useWarningModal";

const WarningModal = () => {
  const [loading, setLoading] = useState(false);

  const { openWarningModal, WarningData, setOpenWarningModal, setWarningData } =
    useWarningModal();

  const handleClose = () => {
    if (loading) return;

    setOpenWarningModal(false);
    setWarningData({
      title: "",
      backButtonText: "",
      function: () => {},
    });
  };

  return (
    <Dialog open={openWarningModal} onOpenChange={handleClose}>
      <DialogContent className="gap-0 p-5 w-[320px] max-w-full">
        <Info className="size-14 mx-auto mt-10 text-red-500" />
        <p className="text-center font-normal text-sm my-5 text-wrap">
          {WarningData.title}
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <Button
            disabled={loading}
            variant="outline"
            className="w-full h-10 text-base font-semibold border-gray-500 text-gray-500 rounded-[8px]"
            onClick={() => {
              if (WarningData.cancelFunction) {
                WarningData.cancelFunction();
                handleClose();
              } else handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            className="w-full bg-red-500 text-white h-10 text-base font-semibold rounded-[8px]"
            onClick={async () => {
              setLoading(true);
              await WarningData.function();
              setLoading(false);
              handleClose();
            }}
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              WarningData.backButtonText
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
