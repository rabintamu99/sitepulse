"use client";

// * * This is just a demostration of edit modal, actual functionality may vary

import { z } from "zod";
import {
  TaskType,
  labels,
  priorities,
  statuses,
} from "@/lib/validations/schema";
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
import { format } from "date-fns";
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
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { label_options, priority_options, status_options } from "../filters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface EditProps {
  websites: {
    id: number;
    userId: string;
    url: string;
    status: number;
    responseTime: number;
    createdAt?: Date;
    updatedAt?: Date;
    metrics?: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      status: number;
      responseTime: number;
      websiteId: number;
    }[];
  };
}

const editSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title Required" }),
  status: z.enum(statuses),
  label: z.enum(labels),
  priority: z.enum(priorities),
  due_date: z.date({
    required_error: "Due date is required.",
  }),
});

type editSchemaType = z.infer<typeof editSchema>;

export default function EditDialog({ websites }: EditProps) {
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      id: websites.id,
      url: websites.url,
      status: websites.status,
      label: websites.label,
      priority: websites.priority,
      due_date: websites.due_date,
    },
  });

  function onSubmit(values: editSchemaType) {
    console.log(values);
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Monitor Details</DialogTitle>
      </DialogHeader>
      <div className='py-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check Interval</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Status to Update' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {status_options.map((status, index) => (
                          <SelectItem key={index} value={status.value}>
                            <span className='flex items-center'>
                              <status.icon className='mr-2 h-5 w-5 text-muted-foreground' />
                              {status.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Label to Update' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {label_options.map((label, index) => (
                          <SelectItem key={index} value={label.value}>
                            <span className='flex items-center'>
                              <label.icon className='mr-2 h-5 w-5 text-muted-foreground' />
                              {label.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Priority to Update' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {priority_options.map((priority, index) => (
                          <SelectItem key={index} value={priority.value}>
                            <span className='flex items-center'>
                              <priority.icon className='mr-2 h-5 w-5 text-muted-foreground' />
                              {priority.label}
                            </span>
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
    </>
  );
}
