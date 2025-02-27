"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserItem from "./user-item";
import { DataTable } from "./data-table";
import { columns } from "./column";

export type User = {
  userId: string;
  employeeId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  userType: string;
};

const users: User[] = [
  { userId: "1", employeeId: "sangsang", email: "sangsang@example.com", firstName: "Sang", lastName: "Huynh", phoneNumber: "0123456789", userType: "nhan_vien" },
  { userId: "2", employeeId: "john_doe", email: "john.doe@example.com", firstName: "John", lastName: "Doe", phoneNumber: "0987654321", userType: "admin" },
  { userId: "3", employeeId: "jane_smith", email: "jane.smith@example.com", firstName: "Jane", lastName: "Smith", phoneNumber: "0345678912", userType: "manager" },
  { userId: "4", employeeId: "david_nguyen", email: "david.nguyen@example.com", firstName: "David", lastName: "Nguyen", phoneNumber: "0765432109", userType: "nhan_vien" },
  { userId: "5", employeeId: "linda_wang", email: "linda.wang@example.com", firstName: "Linda", lastName: "Wang", phoneNumber: "0356789012", userType: "manager" },
  { userId: "6", employeeId: "michael_lee", email: "michael.lee@example.com", firstName: "Michael", lastName: "Lee", phoneNumber: "0890123456", userType: "admin" },
  { userId: "7", employeeId: "anna_brown", email: "anna.brown@example.com", firstName: "Anna", lastName: "Brown", phoneNumber: "0678901234", userType: "nhan_vien" },
  { userId: "8", employeeId: "robert_tan", email: "robert.tan@example.com", firstName: "Robert", lastName: "Tan", phoneNumber: "0567890123", userType: "nhan_vien" },
  { userId: "9", employeeId: "emma_wilson", email: "emma.wilson@example.com", firstName: "Emma", lastName: "Wilson", phoneNumber: "0456789012", userType: "manager" },
  { userId: "10", employeeId: "kevin_lopez", email: "kevin.lopez@example.com", firstName: "Kevin", lastName: "Lopez", phoneNumber: "0345678901", userType: "nhan_vien" },
];

const UserList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesFilter = filterType === "all" || user.userType === filterType;
  
    return matchesSearch && matchesFilter;
  });
  

  return (
    <Card className="p-6 flex-1">
      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <Input
          placeholder="Search by name, email, ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select value={filterType} onValueChange={setFilterType} defaultValue="all">
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="nhan_vien">Nhân Viên</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "table" | "card")}>
          <ToggleGroupItem value="table">Table</ToggleGroupItem>
          <ToggleGroupItem value="card">Card</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-auto max-h-[70vh]">
          <DataTable columns={columns} data={filteredUsers} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredUsers.map((user) => (
            <UserItem key={user.userId} user={user} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default UserList;
