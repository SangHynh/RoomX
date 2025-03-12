import { User } from "@/types/UserType";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Edit, Eye, XCircle } from "lucide-react"; // Import icon từ lucide-react



export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user_code",
    header: "Employee ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => row.original.first_name || "N/A",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => row.original.last_name || "N/A",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: ({ row }) => row.original.phone_number || "N/A",
  },
  {
    accessorKey: "user_type",
    header: "User Type",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-3">
        {/* Xem chi tiết */}
        <span 
          onClick={() => console.log("Xem chi tiết", row.original.user_id)} 
          className="cursor-pointer text-blue-500"
        >
          <Eye size={18} />
        </span>

        {/* Cập nhật */}
        <span 
          onClick={() => console.log("Cập nhật", row.original.user_id)} 
          className="cursor-pointer text-green-500"
        >
          <Edit size={18} />
        </span>

        {/* Vô hiệu hoá */}
        <span 
          onClick={() => console.log("Vô hiệu hoá", row.original.user_id)} 
          className="cursor-pointer text-red-500"
        >
          <XCircle size={18} />
        </span>
      </div>
    ),
  },
];
