"use client";

import * as React from "react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { websitesSchema } from "@/lib/validations/schema";
import { label_options } from "@/components/filters";
import EditDialog from "@/components/modals/edit-modal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeleteDialog from "@/components/modals/delete-modal";
import { useRouter } from "next/navigation"; 
import { deleteMonitor } from "@/app/actions/index";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] =
    React.useState<React.ReactNode | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] =
    React.useState<boolean>(false);
  const websites = row.original as any;
  const router = useRouter(); 

  const handleEditClick = () => {
    setDialogContent(<EditDialog websites={websites as any} />);
  };

  const handleViewClick = () => {
    router.push(`/monitors/view?id=${websites.id}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteMonitor(websites.id.toString());
      toast.success("Monitor deleted successfully");
      setShowDeleteDialog(false);
      revalidatePath('/monitors'); 
    } catch (error) {
      // toast.error("Failed to delete monitor");
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]'>
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(websites.url.toString())}
            className='cursor-pointer'
          >
            <Copy className='mr-2 h-4 w-4' />
            Copy Website URL
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleViewClick} className='cursor-pointer'>
            <Eye className='mr-2 h-4 w-4' />
            View Monitor
          </DropdownMenuItem>
          <DialogTrigger asChild onClick={handleEditClick}>
            <DropdownMenuItem className='cursor-pointer'>
              <Pencil className='mr-2 h-4 w-4' />
              Edit Monitor
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className='text-red-600 cursor-pointer'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Delete Monitor
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='cursor-pointer'>Coming Soon</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={websites.status.toString()}>
                {label_options.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value} className='cursor-pointer'>
                    <label.icon className="w-4 h-4 mr-2" />
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub> */}
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      <DeleteDialog
        websites={websites}
        isOpen={showDeleteDialog}
        showActionToggle={setShowDeleteDialog}
        onConfirm={handleDeleteClick}
      />
    </Dialog>
  );
}