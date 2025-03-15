import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, MoreHorizontal, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type Branch = {
  branchCode: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export const columns: ColumnDef<Branch>[] = [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "branchCode",
    header: "Mã chi nhánh",
  },
  {
    accessorKey: "name",
    header: "Chi nhánh",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-transparent">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            {/* <DropdownMenuItem>
              <Link to={`/admin/branchs/${row.original.branchId}`}>
                Xem chi tiết
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <Link to={`/admin/branches/edit/${row.original.branchCode}`}>
                Cập nhật
              </Link>{" "}
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <DisableBranchDialog triggerText="Vô hiệu hoá" />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
