"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import BranchItem from "./branch-item";
import { DataTable } from "@/components/custom/data-table";
import { columns } from "./column";
// import BranchAddModal from "./branch-add";

export type Branch = {
  branchId: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
};

const branches: Branch[] = [
  { branchId: "1", name: "Chi Nhánh A", phoneNumber: "0123456789", email: "chinhanhA@example.com", address: "123 Đường ABC, TP.HCM" },
  // Thêm các chi nhánh khác...
];

const BranchList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table">("table");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.phoneNumber.includes(searchTerm) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBranch = (newBranch: Branch) => {
    console.log("New Branch Added:", newBranch);
  };

  return (
    <div className="flex-1">
      {/* Thanh tìm kiếm và nút Thêm */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <Input
          placeholder="Search by name, email, phone, address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "table")}>
          <ToggleGroupItem value="table">Table</ToggleGroupItem>
        </ToggleGroup>

        {/* Nút Thêm Chi Nhánh */}
        {/* <BranchAddModal onAddBranch={handleAddBranch} /> */}
      </div>

      {viewMode === "table" ? (
        <div className="overflow-auto max-h-[80vh]">
          <DataTable columns={columns} data={filteredBranches} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredBranches.map((branch) => (
            // <BranchItem key={branch.branchId} branch={branch} />
            <></>
          ))}
        </div>
      )}
    </div>
  );
};

export default BranchList;
