"use strict";

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
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EditProps {
  website?: {
    id: number;
    userId: string;
    url: string;
    checkInterval: string;
  };
}

const checkIntervals = ["1m", "5m", "15m", "30m", "1h", "6h", "12h", "24h"] as const;

const editSchema = z.object({
  id: z.number().optional(),
  url: z.string().url({ message: "Invalid URL" }),
  checkInterval: z.enum(checkIntervals),
});

type EditSchemaType = z.infer<typeof editSchema>;

export default function EditDialog({ website }: EditProps) {
  const form = useForm<EditSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      id: website?.id,
      url: website?.url || "",
      checkInterval: (website?.checkInterval as EditSchemaType["checkInterval"]) || "5m",
    },
  });

  function onSubmit(values: EditSchemaType) {
    console.log(values);
    // Here you would typically send the updated values to your backend
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
                    defaultValue={field.value}
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
    </>
  );
}