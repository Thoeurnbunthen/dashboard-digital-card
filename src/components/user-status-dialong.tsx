// components/dialogs/UserStatusAlertDialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useUserStatusDialog } from "@/store/user-status-dialog-store";

interface Props {
  onConfirm: (userId: string, newStatus: boolean) => void;
  isLoading?: boolean;
}

const UserStatusAlertDialog = ({ onConfirm, isLoading = false }: Props) => {
  const { open, userId, currentStatus, reset, setOpen } = useUserStatusDialog();

  const handleConfirm = () => {
    if (userId && currentStatus !== null) {
      onConfirm(userId, !currentStatus); // toggle status
      reset();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {currentStatus ? "Block this user?" : "Unblock this user?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {currentStatus ? "block" : "unblock"} this
            user? This action can be reversed later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={reset}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
            {currentStatus ? "Block" : "Unblock"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserStatusAlertDialog;
