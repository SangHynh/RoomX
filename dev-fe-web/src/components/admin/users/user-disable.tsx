// components/DisableUserDialog.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog"; // Import Dialog components

interface DisableUserDialogProps {
  triggerText: string; 
}

const DisableUserDialog: React.FC<DisableUserDialogProps> = ({ triggerText }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-red-500 cursor-pointer">{triggerText}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Vô hiệu hoá người dùng</DialogTitle>
        <DialogDescription>
          Bạn có chắc chắn muốn vô hiệu hoá người dùng này không?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline">Hủy</Button>
          <Button variant="destructive">Vô hiệu hoá</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisableUserDialog;
