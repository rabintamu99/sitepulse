"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { updateMonitor } from "@/app/actions";
import toast from "react-hot-toast";

interface EditProps {
  website?: {
    id: number;
    userId: string;
    url: string;
    checkInterval: string;
  };
  showActionToggle: (open: boolean) => void;
  onConfirm: () => void;
}

const checkIntervals = ["1m", "5m", "15m", "30m", "60m"] as const;

const editSchema = z.object({
  id: z.number().optional(),
  url: z.string().url().optional(),
  checkInterval: z.enum(checkIntervals).optional(),
});

type EditSchemaType = z.infer<typeof editSchema>;

export default function EditDialog({ website }: EditProps) {
  const form = useForm<EditSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      id: website?.id,
      url: website?.url || "",
      checkInterval: (website?.checkInterval as EditSchemaType['checkInterval']) || "5m",
    },
  });

  async function onSubmit(values: EditSchemaType) {
    if (website?.id) {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value !== undefined) formData.append(key, value.toString());
        });
        await updateMonitor(website.id.toString(), formData);
        toast.success("Monitor updated successfully");
      } catch (error) {
        console.error("Failed to update monitor:", error);
        toast.error("Failed to update monitor");
      }
    }
  }

  console.log("website", website?.url);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Monitor Details</DialogTitle>
        <DialogDescription>
          Update the check interval for your website monitor.
        </DialogDescription>
      </DialogHeader>
      <div className='py-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input type='url' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='checkInterval'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check Interval</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Check Interval' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {checkIntervals.map((interval) => (
                          <SelectItem key={interval} value={interval}>
                            {interval}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-2 w-full'>
              Update Monitor
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}