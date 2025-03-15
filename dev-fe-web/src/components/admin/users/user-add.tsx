import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { UserService } from "@/services/admin/user.service"; // import UserService
import { toast } from "sonner";

export interface User {
  userCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  gender: string;
  email: string;
  type: "EMPLOYEE" | "APPROVER"; 
  roles: string[]; 
}

interface UserAddModalProps {
  onAddSuccess: () => void; 
}

const UserAddModal: React.FC<UserAddModalProps> = ({ onAddSuccess }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("employee");
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const userService = new UserService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Đảm bảo tất cả các trường hợp nhập là hợp lệ trước khi gửi yêu cầu
    if (!employeeId || !email || !firstName || !lastName || !phoneNumber || !userType) {
      alert("Please fill all fields.");
      return;
    }

    // Tạo một đối tượng người dùng từ form
    const newUser: User = {
      userCode: employeeId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: "password123", 
      gender: "true", 
      email: email,
      type: userType === "employee" ? "EMPLOYEE" : "APPROVER",
      roles: userType === "employee" ? ["USER"] : ["USER", "APPROVER"]
    };

    try {
      await userService.createUser(newUser);
      toast.success("Tạo người dùng thành công!", {
        description: <strong>Người dùng {firstName} {lastName} đã được thêm.</strong>,
      });      
      setIsDialogOpen(false); 
      onAddSuccess();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          Thêm người dùng
        </button>
      </DialogTrigger>

      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <DialogTitle className="text-xl font-semibold mb-4">Tạo người dùng mới</DialogTitle>
        <DialogDescription className="text-sm mb-6">Điền đầy đủ các thông tin bên dưới</DialogDescription>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã nhân viên</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập mã nhân viên"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập email"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập họ"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập tên"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại người dùng</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
            >
              <option value="employee">Nhân Viên</option>
              <option value="approver">Kiểm duyệt viên</option>
            </select>
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
              Thêm người dùng
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserAddModal;
