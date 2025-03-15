"use client";

import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/custom/data-table";
import { columns } from "./column";
import { BranchService } from "@/services/admin/branch.service";

export type Branch = {
  branchId: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
};

const BranchList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Số lượng chi nhánh trên mỗi trang

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const branchService = new BranchService();
        const data = await branchService.getListBranches(pageIndex + 1);
        console.log(data)
        setBranches(
          data.content.map((branch: any) => ({
            branchId: branch.id,
            name: branch.name,
            phoneNumber: branch.phoneNumber,
            email: branch.email,
            address: branch.address,
          }))
        );

        setTotalPages(data.pagination.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [pageIndex]);

  return (
    <div className="flex-1">
      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <Input
          placeholder="Search by name, email, phone, address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && setViewMode(value as "table")}
        >
          <ToggleGroupItem value="table">Bảng</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-auto max-h-[80vh]">
          <DataTable
            columns={columns}
            data={branches}
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={totalPages}
            onPageChange={(newPage) => {
              if (newPage >= 0 && newPage < totalPages) {
                setPageIndex(newPage);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BranchList;
