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
  // add more fields here if needed
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
  });

  // When userData changes (opening dialog), update formData
  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.id,
        full_name: userData.full_name || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  if (!isOpen) return null;

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simple validation: disable save if name or email is empty
  const isSaveDisabled = !formData.full_name.trim() || !formData.email.trim();

  // Handle submit click
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
          <Input
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            autoFocus
          />
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
