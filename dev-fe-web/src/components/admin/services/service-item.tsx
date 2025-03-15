import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getShortName } from "@/utils/string.util";

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

// Hàm cắt ngắn mô tả nếu quá dài
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

interface ServiceItemProps {
  service: ServiceType;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-[300px] p-4 border rounded-xl shadow-md bg-white transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex items-center gap-3 p-0 relative">
        {/* Avatar (Hoặc icon cho dịch vụ) */}
        <Avatar className="w-16 h-16 border border-gray-300 shadow-sm">
          <AvatarImage src={""} alt={service.name} />
          <AvatarFallback>{getShortName(service.name)}</AvatarFallback>
        </Avatar>

        {/* Service Info */}
        <div className="flex flex-col overflow-hidden leading-tight flex-1">
          <CardTitle className="text-lg font-semibold truncate text-gray-900">
            {service.name}
          </CardTitle>
          <CardDescription className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text text-center">
            {truncateText(service.unitPrice + " VNĐ" || "Không có mô tả", 50)}
          </CardDescription>
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 bg-transparent focus:outline-none hover:text-gray-900 transition-all">
            <MoreVertical size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="end"
            sideOffset={5}
            className="w-40 border rounded-lg shadow-md bg-white"
          >
            <DropdownMenuItem
              onClick={() => navigate(`/admin/services/${service.id}`)}
              className="hover:bg-gray-100"
            >
              🔍 Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Update", service.id)}
              className="hover:bg-gray-100"
            >
              ✏️ Cập nhật
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="hover:bg-red-100 text-red-500"
            >
              ❌ Xóa dịch vụ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
    </Card>
  );
};

export default ServiceItem;
