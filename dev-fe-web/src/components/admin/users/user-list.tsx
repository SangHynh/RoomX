"use client";

import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserItem from "./user-item";
import UserAddModal from "./user-add";
import { UserService } from "@/services/user.service";
import UserTable from "@/components/admin/users/user-table";
import { columns } from "@/components/admin/users/column";
import { DataTable } from "@/components/custom/data-table";

export type User = {
  user_id: string;
  user_code: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  user_type: string;
};

const UserList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  // Thêm state để quản lý phân trang
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userService = new UserService();
        const data = await userService.getListUsers(pageIndex, 10);
        console.log(data.content);
        console.log(data.total_pages);
        setUsers(data.content || []);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [pageIndex]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === "all" || user.user_type === filterType;

    return matchesSearch && matchesFilter;
  });

  const handleAddUser = (newUser: User) => {
    console.log("New User Added:", newUser);
  };

  return (
    <div className="flex-1">
      {/* Thanh tìm kiếm, bộ lọc và nút Thêm */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <Input
          placeholder="Search by name, email, ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select
          value={filterType}
          onValueChange={setFilterType}
          defaultValue="all"
        >
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="nhan_vien">Nhân Viên</SelectItem>
            <SelectItem value="apporver">Kiểm duyệt viên</SelectItem>
          </SelectContent>
        </Select>
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) =>
            value && setViewMode(value as "table" | "card")
          }
        >
          <ToggleGroupItem value="table">Table</ToggleGroupItem>
          <ToggleGroupItem value="card">Card</ToggleGroupItem>
        </ToggleGroup>

        {/* Nút Thêm User */}
        <UserAddModal onAddUser={handleAddUser} />
      </div>

      {viewMode === "table" ? (
        <div className="flex-1 min-h-[80vh] ">
          <DataTable
            columns={columns}
            data={filteredUsers}
            pageIndex={pageIndex}
            pageSize={10}
            pageCount={totalPages}
            onPageChange={(newPage) => {
              if (newPage >= 0 && newPage < totalPages) {
                setPageIndex(newPage);
              }
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredUsers.map((user) => (
            <UserItem key={user.user_id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
