import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { EquipmentService } from "@/services/admin/equipment.service"; // Import EquipmentService
import { toast } from "sonner";

export interface Equipment {
  equipmentCode: string;
  name: string;
  brand: string;
  description: string;
  unitPrice: number;
}

interface EquipmentAddModalProps {
  onAddSuccess: () => void; // Callback sau khi thêm thiết bị thành công
}

const EquipmentAddModal: React.FC<EquipmentAddModalProps> = ({ onAddSuccess }) => {
  const [equipmentCode, setEquipmentCode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const equipmentService = new EquipmentService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!equipmentCode || !name || !brand || !description || !unitPrice) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const newEquipment: Equipment = {
      equipmentCode,
      name,
      brand,
      description,
      unitPrice: parseFloat(unitPrice),
    };

    try {
      await equipmentService.createEquipment(newEquipment);
      toast.success("Thiết bị đã được thêm thành công!", {
        description: <strong>{name} đã được tạo.</strong>,
      });

      setIsDialogOpen(false);
      setEquipmentCode("");
      setName("");
      setBrand("");
      setDescription("");
      setUnitPrice("");
      onAddSuccess();
    } catch (error) {
      console.error("Lỗi khi thêm thiết bị:", error);
      toast.error("Đã có lỗi xảy ra khi thêm thiết bị.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          Thêm thiết bị
        </button>
      </DialogTrigger>

      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <DialogTitle className="text-xl font-semibold mb-4">Thêm thiết bị mới</DialogTitle>
        <DialogDescription className="text-sm mb-6">Nhập thông tin chi tiết của thiết bị</DialogDescription>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã thiết bị</label>
            <input
              type="text"
              value={equipmentCode}
              onChange={(e) => setEquipmentCode(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập mã thiết bị"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên thiết bị</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập tên thiết bị"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Thương hiệu</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập thương hiệu"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá (VNĐ)</label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập đơn giá"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập mô tả"
              rows={3}
            />
          </div>

          

          <div className="col-span-2 flex justify-between items-center mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Huỷ
              </button>
            </DialogClose>

            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Thêm thiết bị
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentAddModal;
