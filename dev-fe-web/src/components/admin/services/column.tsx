import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export interface ServiceType {
  id: string;
  serviceCode: string;
  name: string;
  description: string;
  note: string;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<ServiceType>[] = [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "serviceCode",
    header: "Mã dịch vụ",
  },
  {
    accessorKey: "name",
    header: "Tên dịch vụ",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) =>
      row.original.description.length > 50
        ? row.original.description.substring(0, 50) + "..."
        : row.original.description,
  },
  {
    accessorKey: "unitPrice",
    header: "Giá dịch vụ",
    cell: ({ row }) => `${row.original.unitPrice.toLocaleString()} VND`,
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
            <DropdownMenuItem>
              <Link to={`/admin/services/${row.original.id}`}>
                Xem chi tiết
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                alert(`Chỉnh sửa dịch vụ: ${row.original.name}`);
              }}
            >
              Cập nhật
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                alert(`Xóa dịch vụ: ${row.original.name}`);
              }}
            >
              Ẩn dịch vụ
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
