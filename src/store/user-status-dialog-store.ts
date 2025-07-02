// // store/userStatusDialogStore.ts
// import { create } from "zustand";

// interface UserStatusDialogState {
//   open: boolean;
//   userId: string | null;
//   currentStatus: boolean | null;
//   setDialog: (userId: string, status: boolean) => void;
//   setOpen: (value: boolean) => void;
//   reset: () => void;
// }

// export const useUserStatusDialog = create<UserStatusDialogState>((set) => ({
//   open: false,
//   userId: null,
//   currentStatus: null,
//   setDialog: (userId, status) =>
//     set({ open: true, userId, currentStatus: status }),
//   setOpen: (value) => set({ open: value }),
//   reset: () => set({ open: false, userId: null, currentStatus: null }),
// }));
// store/userStatusDialogStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStatusDialogState {
  open: boolean;
  userId: string | null;
  currentStatus: boolean | null;
  setDialog: (userId: string, status: boolean) => void;
  setOpen: (value: boolean) => void;
  reset: () => void;
}

export const useUserStatusDialog = create<UserStatusDialogState>()(
  devtools(
    (set) => ({
      open: false,
      userId: null,
      currentStatus: null,
      setDialog: (userId, status) =>
        set(
          { open: true, userId, currentStatus: status },
          false,
          "userStatusDialog/setDialog"
        ),
      setOpen: (value) =>
        set({ open: value }, false, "userStatusDialog/setOpen"),
      reset: () =>
        set(
          { open: false, userId: null, currentStatus: null },
          false,
          "userStatusDialog/reset"
        ),
    }),
    { name: "UserStatusDialog Store" }
  )
);
