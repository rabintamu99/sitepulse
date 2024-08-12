"use client"

// * * This is just a demostration of delete modal, actual functionality may vary

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { WebsiteType } from "@/lib/validations/schema";
  import { Button } from "@/components/ui/button";
  
  type DeleteProps = {
    websites: WebsiteType;
    isOpen: boolean;
    showActionToggle: (open: boolean) => void;
    onConfirm: () => void;
  };
  
  export default function DeleteDialog({
    websites,
    isOpen,
    showActionToggle,
    onConfirm,
  }: DeleteProps) {
    return (
      <AlertDialog open={isOpen} onOpenChange={showActionToggle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You are about to delete Website
              Details of <b>{websites.url}</b>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant='destructive'
              onClick={() => {
                showActionToggle(false);
                onConfirm();
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }