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

const profileFormSchema = z.object({
  timezone: z.string().nonempty({ message: "Timezone is required." }),
  country: z.string().nonempty({ message: "Country is required." }),
  address: z.string().nonempty({ message: "Address is required." }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileComponent() {
  const { data: session, status } = useSession()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      timezone: "",
      country: "",
      address: "",
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

  function handleDeleteAccount() {
    // Add your account deletion logic here
    toast.error("Account deletion is not implemented yet.");
  }

  return (
    <div className="flex space-x-10">
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full p-2 overflow-y-auto">
          <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-12:00">UTC-12:00 - Baker Island Time</SelectItem>
                        <SelectItem value="UTC-11:00">UTC-11:00 - Niue Time</SelectItem>
                        <SelectItem value="UTC-10:00">UTC-10:00 - Hawaii-Aleutian Time</SelectItem>
                        <SelectItem value="UTC-09:00">UTC-09:00 - Alaska Time</SelectItem>
                        <SelectItem value="UTC-08:00">UTC-08:00 - Pacific Time</SelectItem>
                        <SelectItem value="UTC-07:00">UTC-07:00 - Mountain Time</SelectItem>
                        <SelectItem value="UTC-06:00">UTC-06:00 - Central Time</SelectItem>
                        <SelectItem value="UTC-05:00">UTC-05:00 - Eastern Time</SelectItem>
                        <SelectItem value="UTC-04:00">UTC-04:00 - Atlantic Time</SelectItem>
                        <SelectItem value="UTC-03:00">UTC-03:00 - Argentina Time</SelectItem>
                        <SelectItem value="UTC-02:00">UTC-02:00 - South Georgia Time</SelectItem>
                        <SelectItem value="UTC-01:00">UTC-01:00 - Azores Time</SelectItem>
                        <SelectItem value="UTC+00:00">UTC+00:00 - Greenwich Mean Time</SelectItem>
                        <SelectItem value="UTC+01:00">UTC+01:00 - Central European Time</SelectItem>
                        <SelectItem value="UTC+02:00">UTC+02:00 - Eastern European Time</SelectItem>
                        <SelectItem value="UTC+03:00">UTC+03:00 - Moscow Time</SelectItem>
                        <SelectItem value="UTC+04:00">UTC+04:00 - Gulf Standard Time</SelectItem>
                        <SelectItem value="UTC+05:00">UTC+05:00 - Pakistan Standard Time</SelectItem>
                        <SelectItem value="UTC+06:00">UTC+06:00 - Bangladesh Time</SelectItem>
                        <SelectItem value="UTC+07:00">UTC+07:00 - Indochina Time</SelectItem>
                        <SelectItem value="UTC+08:00">UTC+08:00 - China Standard Time</SelectItem>
                        <SelectItem value="UTC+09:00">UTC+09:00 - Japan Standard Time</SelectItem>
                        <SelectItem value="UTC+10:00">UTC+10:00 - Australian Eastern Time</SelectItem>
                        <SelectItem value="UTC+11:00">UTC+11:00 - Solomon Islands Time</SelectItem>
                        <SelectItem value="UTC+12:00">UTC+12:00 - New Zealand Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This timezone is used to display times in your local time.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                        <SelectItem value="CN">China</SelectItem>
                        <SelectItem value="BR">Brazil</SelectItem>
                        <SelectItem value="ZA">South Africa</SelectItem>
                        <SelectItem value="RU">Russia</SelectItem>
                        <SelectItem value="MX">Mexico</SelectItem>
                        <SelectItem value="IT">Italy</SelectItem>
                        <SelectItem value="ES">Spain</SelectItem>
                        <SelectItem value="KR">South Korea</SelectItem>
                        <SelectItem value="NG">Nigeria</SelectItem>
                        <SelectItem value="AR">Argentina</SelectItem>
                        <SelectItem value="SA">Saudi Arabia</SelectItem>
                        <SelectItem value="TR">Turkey</SelectItem>
                        <SelectItem value="NL">Netherlands</SelectItem>
                        <SelectItem value="SE">Sweden</SelectItem>
                        <SelectItem value="CH">Switzerland</SelectItem>
                        <SelectItem value="BE">Belgium</SelectItem>
                        <SelectItem value="PL">Poland</SelectItem>
                        <SelectItem value="NO">Norway</SelectItem>
                        <SelectItem value="FI">Finland</SelectItem>
                        <SelectItem value="DK">Denmark</SelectItem>
                        <SelectItem value="IE">Ireland</SelectItem>
                        <SelectItem value="NZ">New Zealand</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This country is used for localization purposes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormDescription>
                    This address is used for billing and shipping purposes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit">Update Account</Button>
          </form>
        </Form>
      </div>
      <div className="w-1/2">
        <div className="p-4 bg-red-200/15 border border-red-50 shadow rounded">
          <h2 className="text-xl font-bold">Delete Account</h2>
          <p className="text-gray-600">Permanently delete your account and all associated data.</p>
          <Button variant="destructive" onClick={handleDeleteAccount} className="mt-3">Delete Account</Button>
        </div>
      </div>
    </div>
  )
}