import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export type User = {
  user_id: string;
  user_code: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  user_type: string;
};

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
  open: boolean; // Truyền vào prop `open` từ `UserItem`
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  onClose,
  open,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open); // Quản lý trạng thái modal riêng biệt

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeModal = () => {
    setIsOpen(false); // Đóng modal khi người dùng nhấn đóng
    onClose(); // Gọi onClose từ props để thông báo đã đóng modal
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Information about {user.first_name} {user.last_name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <strong>User ID:</strong> {user.user_id}
          </p>{" "}
          {/* Thêm trường User ID */}
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Employee ID:</strong> {user.user_code}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phone_number}
          </p>
          <p>
            <strong>Role:</strong> {user.user_type}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;
