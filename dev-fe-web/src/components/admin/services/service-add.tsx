import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { ServiceService } from "@/services/admin/service.service"; // Import ServiceService
import { toast } from "sonner";

export interface Service {
  serviceCode: string;
  name: string;
  description: string;
  note: string;
  unitPrice: number;
}

interface ServiceAddModalProps {
  onAddSuccess: () => void; // Callback sau khi thêm dịch vụ thành công
}

const ServiceAddModal: React.FC<ServiceAddModalProps> = ({ onAddSuccess }) => {
  const [serviceCode, setServiceCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const serviceService = new ServiceService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceCode || !name || !description || !unitPrice) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const newService: Service = {
      serviceCode,
      name,
      description,
      note,
      unitPrice: parseFloat(unitPrice),
    };

    try {
      await serviceService.createService(newService);
      toast.success("Dịch vụ đã được thêm thành công!", {
        description: <strong>{name} đã được tạo.</strong>,
      });

      setIsDialogOpen(false);
      setServiceCode("");
      setName("");
      setDescription("");
      setNote("");
      setUnitPrice("");
      onAddSuccess();
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error);
      toast.error("Đã có lỗi xảy ra khi thêm dịch vụ.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          Thêm dịch vụ
        </button>
      </DialogTrigger>

      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <DialogTitle className="text-xl font-semibold mb-4">Thêm dịch vụ mới</DialogTitle>
        <DialogDescription className="text-sm mb-6">Nhập thông tin chi tiết của dịch vụ</DialogDescription>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã dịch vụ</label>
            <input
              type="text"
              value={serviceCode}
              onChange={(e) => setServiceCode(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập mã dịch vụ"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên dịch vụ</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập tên dịch vụ"
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

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập ghi chú (nếu có)"
              rows={2}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá (VNĐ)</label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập đơn giá"
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
              Thêm dịch vụ
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceAddModal;
