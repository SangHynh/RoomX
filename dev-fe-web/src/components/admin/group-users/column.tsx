"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom";

export type GroupUser = {
  groupId: string;
  groupName: string;
  details: string;
  type: string;
  memberCount: number;
}

export const columns: ColumnDef<GroupUser>[] = [
  {
    accessorKey: "groupId",
    header: "Group ID",
  },
  {
    accessorKey: "groupName",
    header: "Group Name",
    cell: ({ row }) => (
      <Link to={`/users/groups?groupId=${row.original.groupId}`} className="text-blue-600 hover:underline">
        {row.original.groupName}
      </Link>
    ),  },
  {
    accessorKey: "details",
    header: "Details",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "memberCount",
    header: "Member Count",
  },
]
