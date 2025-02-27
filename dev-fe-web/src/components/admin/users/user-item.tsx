import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { getShortName } from "@/utils/string.util";
import React from "react";

interface UserItemProps {
  user: {
    userId: string;
    employeeId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const fullName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : "Unknown User";

  return (
    <Card className="w-full max-w-[280px] p-3 border rounded-lg shadow-sm relative">
      <CardHeader className="flex items-center gap-3 p-0">
        {/* Avatar */}
        <Avatar className="w-14 h-14 border border-gray-300">
          <AvatarImage src="" alt={fullName} />
          <AvatarFallback>{getShortName(fullName)}</AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex flex-col overflow-hidden leading-tight flex-1">
          <CardTitle className="text-base font-semibold truncate">{fullName}</CardTitle>
          <CardDescription className="text-sm text-gray-600 truncate">
            {user.email || "No Email"}
          </CardDescription>
          <CardDescription className="text-sm text-gray-500">{user.employeeId || "No ID"}</CardDescription>
        </div>

        {/* Dropdown Menu */}
<DropdownMenu>
<DropdownMenuTrigger className="border-none absolute right-2 top-1/2 -translate-y-1/2 p-2 text-foreground bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
    <MoreVertical size={20} />
  </DropdownMenuTrigger>
  <DropdownMenuContent side="right" align="end" sideOffset={5} className="w-36">
    <DropdownMenuItem onClick={() => console.log("View details", user.userId)}>
      Xem chi tiết
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => console.log("Update", user.userId)}>
      Cập nhật
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => console.log("Disable", user.userId)} className="text-red-500">
      Vô hiệu hoá
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

      </CardHeader>
    </Card>
  );
};

export default UserItem;
