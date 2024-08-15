"use client";

import { ColumnDef, Table } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { WebsiteType } from "@/lib/validations/schema";
import { status_options } from "../filters";
import { formatDistanceToNow, differenceInSeconds, parseISO } from "date-fns";
import NumberTicker from "../magicui/number-ticker";

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
              <span className={`w-3 h-3 ${status.value === 200 ? "bg-green-500" : "bg-red-500"} rounded-full`}></span>
              <span className={`w-3 h-3 animate-ping ${status.value === 200 ? "bg-green-500" : "bg-red-500"} rounded-full absolute top-0 left-0`}></span>
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
        <NumberTicker value={row.getValue("responseTime")} />
        <span>ms</span>
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
      try {
        const updatedAt = row.getValue("updatedAt");
        let date: Date;
  
        if (updatedAt instanceof Date) {
          date = updatedAt;
        } else if (typeof updatedAt === 'string') {
          date = new Date(updatedAt);
        } else if (typeof updatedAt === 'number') {
          date = new Date(updatedAt);
        } else {
          throw new Error("Invalid date format");
        }
  
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date");
        }
  
        // Convert to local time
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        
        const now = new Date();
        const diffInSeconds = differenceInSeconds(now, localDate);
        
        if (diffInSeconds < 60) {
          return <div>Just now</div>;
        } else {
          const formattedTime = formatDistanceToNow(localDate, { addSuffix: true });
          return <div>{formattedTime}</div>;
        }
      } catch (error) {
        console.error("Error formatting date:", error);
        return <div>Checking..</div>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];