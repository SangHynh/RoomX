import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import CMSLayout from "@/layouts/cms-layout";
import { useEffect, useState } from "react";
import { UserService } from "@/services/admin/user.service";
import { Button } from "@/components/ui/button";
import {
  Hash,
  Mail,
  Pencil,
  Phone,
  Slash,
  SlashIcon,
  Trash2,
  User,
  UserX,
} from "lucide-react";
import { getShortName } from "@/utils/string.util";

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState<any>(null); // State để lưu dữ liệu user
  const userService = new UserService(); // Tạo instance của UserService

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUserDetails(userId || "");
        setUser(response.result.content[0]);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <CMSLayout>
      <div className="flex justify-center items-center flex-1">
        <Card className="w-full max-w-4xl shadow-xl rounded-3xl overflow-hidden">
          {/* Header */}
          <CardHeader className="flex flex-col items-center bg-blue-300 text-white py-6">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage
                src={user?.avatar || "/placeholder-avatar.png"}
                alt="User Avatar"
              />
              <AvatarFallback className="bg-gray-300 text-gray-700 text-2xl">
                {getShortName(user?.firstName || "UK")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-2xl font-bold">
              {user?.firstName || "Unknown"} {user?.lastName || "User"}
            </CardTitle>
            <Badge className="mt-2 px-3 py-1 bg-white text-blue-600 text-sm font-semibold rounded-full">
              {user?.userType}
            </Badge>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-6">
            <Separator className="my-4" />
            <div className="space-y-4 text-gray-700 text-lg">
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                <strong className="w-36">Email:</strong>
                <span>{user?.email}</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-green-500" />
                <strong className="w-36">Số điện thoại:</strong>
                <span>{user?.phoneNumber || "Chưa có"}</span>
              </p>
              <p className="flex items-center">
                <User className="w-5 h-5 mr-3 text-yellow-500" />
                <strong className="w-36">Mã người dùng:</strong>
                <span>{user?.userCode}</span>
              </p>
              <p className="flex items-center">
                <Hash className="w-5 h-5 mr-3 text-red-500" />
                <strong className="w-36">ID người dùng:</strong>
                <span>{user?.userId}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" className="flex items-center">
                <Pencil className="w-4 h-4 mr-2" /> Cập nhật
              </Button>
              <Button variant="destructive" className="flex items-center">
                <UserX className="w-4 h-4 mr-2" /> Vô hiệu hoá
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
}
