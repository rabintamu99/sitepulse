"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-hot-toast"
import {PhoneInput}  from "@/components/ui/phone-input"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z.string().min(10).max(15),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileComponent() {
  const { data: session, status } = useSession()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    toast.custom((t) => (
      <div className={`bg-white p-4 rounded shadow-lg ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <p className="font-bold">You submitted the following values:</p>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    ));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-[500px] p-2 overflow-y-auto">
          <div className="flex items-center space-x-4">
            <img src={session?.user?.image ?? undefined} alt="Avatar" className="w-16 h-16 rounded-full" />
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder={session?.user?.name ?? ""} {...field} />
                    </FormControl>
                    <FormDescription>
                      Used to display in applications and in all communications with you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder={session?.user?.email ?? ""} {...field} />
                </FormControl>
                <FormDescription>
                  This e-mail is used to login, get alert notifications and reports.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="text-left">
                          Phone Number
                        </FormLabel>
                        <FormControl className="w-full">
                          <PhoneInput className="py-4"
                            placeholder="Enter a phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-left">
                          Enter a phone number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </>
  )
}