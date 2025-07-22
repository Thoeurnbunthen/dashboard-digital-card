// store/user-edit-dialog-store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserEditDialogState {
  isOpen: boolean;
  userData: any;
  open: (user: any) => void;
  close: () => void;
}

export const useUserEditDialog = create<UserEditDialogState>()(
  devtools(
    (set) => ({
      isOpen: false,
      userData: null,
      open: (user) => set({ isOpen: true, userData: user }, false, "userEditDialog/open"),
      close: () => set({ isOpen: false, userData: null }, false, "userEditDialog/close"),
    }),
    { name: "UserEditDialog Store" }
  )
);
