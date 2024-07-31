"use client";

import { ColumnDef, Table } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { WebsiteType } from "@/lib/validations/schema"; // Assuming WebsiteType is defined in your schema
import { label_options, priority_options, status_options } from "../filters";
import { formatDistanceToNow } from "date-fns";

export const columns: ColumnDef<WebsiteType>[] = [
  {
    id: "select",
    header: ({ table }: { table: Table<any> }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Url' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[500px] truncate font-medium'>
        {row.getValue("url")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = status_options.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center relative'>
          <div className="flex relative">
              <span className={`w-3 h-3 ${status.value === 200 ? "bg-green-500" : "bg-red-500"} rounded-full`}></span> {/* Static dot */}
              <span className={`w-3 h-3 animate-ping ${status.value === 200 ? "bg-green-500" : "bg-red-500"} rounded-full absolute top-0 left-0`}></span> {/* Heartbeat */}
            </div>
          <span className="ml-2">{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "responseTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Response Time' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center'>
        <span>{row.getValue("responseTime")} ms</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Checked' />
    ),
    cell: ({ row }) => {
      const field = new Date(row.getValue("updatedAt"));
      const formattedUpdatedAt = formatDistanceToNow(field, { addSuffix: true });
      return (<div>{formattedUpdatedAt}</div>);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];