"use client"

import { ColumnDef } from "@tanstack/react-table"

export type User = {
  userId: string;
  employeeId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  userType: string;
}

export const columns: ColumnDef<User>[] = [
//   {
//     accessorKey: "userId",
//     header: "User ID",
//   },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => row.original.firstName || "N/A",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => row.original.lastName || "N/A",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => row.original.phoneNumber || "N/A",
  },
  {
    accessorKey: "userType",
    header: "User Type",
  },
]
