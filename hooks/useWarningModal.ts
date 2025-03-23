import { create } from "zustand";

interface WarningModalState {
  WarningData: {
    title: string;
    backButtonText: string;
    function: () => void | Promise<void>;
    cancelFunction?: () => void;
  };
  openWarningModal: boolean;
  setOpenWarningModal: (value: boolean) => void;
  setWarningData: (data: WarningModalState["WarningData"]) => void;
}

export const useWarningModal = create<WarningModalState>((set) => ({
  WarningData: {
    title: "",
    backButtonText: "",
    function: () => {},
  },
  openWarningModal: false,
  setOpenWarningModal: (openWarningModal) => set({ openWarningModal }),
  setWarningData: (WarningData) => set({ WarningData }),
}));
