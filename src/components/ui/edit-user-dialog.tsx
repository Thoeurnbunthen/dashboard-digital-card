import React, { useState, useEffect } from "react";
import { useUserEditDialog } from "@/store/user-edit-dialog-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserFormData {
  id?: string;
  full_name: string;
  email: string;
  user_name: string;
}

interface Props {
  onConfirm: (data: UserFormData) => void;
  isLoading: boolean;
}

const EditUserDialog: React.FC<Props> = ({ onConfirm, isLoading }) => {
  const { isOpen, userData, close } = useUserEditDialog();

  // Initialize formData with userData or default empty values
  const [formData, setFormData] = useState<UserFormData>({
    full_name: "",
    email: "",
    user_name: "",
  });


  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.id,
        full_name: userData.full_name || "",
        email: userData.email || "",
        user_name: userData.user_name || "",
      });
    }
  }, [userData]);

  if (!isOpen) return null;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const isSaveDisabled = !formData.full_name.trim() || !formData.email.trim();


  const handleSubmit = () => {
    onConfirm(formData);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Edit User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>Full_name</p>
          <Input
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            autoFocus
          />
          <p>User_name</p>
          <Input
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="User Name"
            autoFocus
          />
          <p>Email</p>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {/* Add other fields here if needed */}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            className="ml-2"
            disabled={isSaveDisabled || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
