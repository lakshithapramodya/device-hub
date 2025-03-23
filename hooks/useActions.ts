import type { CommonResponseDataType } from "@/types/common";
import { useSuccessModal } from "./useSuccessModal";
import { useWarningModal } from "./useWarningModal";

export const useActions = () => {
  const { setOpenSuccessModal, setSuccessData } = useSuccessModal();

  const { setWarningData, setOpenWarningModal } = useWarningModal();

  const handleAction = async (
    func: () => Promise<CommonResponseDataType>,
    warningText: string,
    successText: string,
    cancelFunction?: () => void
  ) => {
    setWarningData({
      title: warningText,
      backButtonText: "Yes",
      function: async () => {
        const response = await func();

        if (response.status === "SUCCESS") {
          setSuccessData({
            title: successText,
            backButtonText: "Continue",
            function: () => {},
          });
          setOpenSuccessModal(true);
        }
      },
      cancelFunction,
    });

    setOpenWarningModal(true);
  };

  return { handleAction };
};
