import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, XCircle } from "lucide-react";

export type Branch = {
  branchId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export const columns: ColumnDef<Branch>[] = [
  {
    accessorKey: "name",
    header: "Branch Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-3">
        {/* Xem chi tiết */}
        <span 
          onClick={() => console.log("Xem chi tiết", row.original.branchId)} 
          className="cursor-pointer text-blue-500"
        >
          <Eye size={18} />
        </span>

        {/* Cập nhật */}
        <span 
          onClick={() => console.log("Cập nhật", row.original.branchId)} 
          className="cursor-pointer text-green-500"
        >
          <Edit size={18} />
        </span>

        {/* Vô hiệu hoá */}
        <span 
          onClick={() => console.log("Vô hiệu hoá", row.original.branchId)} 
          className="cursor-pointer text-red-500"
        >
          <XCircle size={18} />
        </span>
      </div>
    ),
  },
];
