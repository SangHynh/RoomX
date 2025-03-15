import { columns } from "@/components/admin/users/column";
import { DataTable } from "@/components/admin/custom/data-table";
import React from "react";

interface UserTableProps {
  users: any[];
  pageIndex: number;
  setPageIndex: (page: number) => void;
  totalPages: number;
}

const UserTable: React.FC<UserTableProps> = ({ users, pageIndex, setPageIndex, totalPages }) => {
  const pageSize = 10; 

  return (
    <div className="overflow-auto max-h-[80vh]">
      <DataTable
        columns={columns}
        data={users}
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
  );
};

export default UserTable;
