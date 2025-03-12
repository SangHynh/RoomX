import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { User } from "@/types/UserType";


interface UserAddModalProps {
  onAddUser: (newUser: User) => void;
}

const UserAddModal: React.FC<UserAddModalProps> = ({ onAddUser }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("nhan_vien");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          Add User
        </button>
      </DialogTrigger>

      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <DialogTitle className="text-xl font-semibold mb-4">Add New User</DialogTitle>
        <DialogDescription className="text-sm mb-6">Fill in the user details below</DialogDescription>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Enter employee ID"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Enter email"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Enter first name"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Enter last name"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded-md"
              placeholder="Enter phone number"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
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
                Cancel
              </button>
            </DialogClose>

            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserAddModal;
