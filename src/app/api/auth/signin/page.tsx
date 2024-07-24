import GlobeComponent from "@/components/GlobeComponent"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "../../../../auth"
import { FcGoogle } from "react-icons/fc";

export default function Signin() {
  return (
    <div className="w-full h-screen dark:bg-black bg-white grid lg:grid-cols-2">
      <div className="absolute top-8 left-10">
        <Link href="/" className="text-muted-foreground">← Back to SitePulse</Link>
      </div>
      <div className="flex items-center justify-center py-12">
        <GlobeComponent />
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            {/* <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button> */}
              <form
      action={async (formData) => {
        "use server"
        await signIn("resend", formData)
      }}
    >
      <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
      <Button type="submit" className="w-full mt-5">
              Signin with Email
            </Button>
    </form>
            <div className="flex items-center mb-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-4 text-sm text-gray-500">OR CONTINUE WITH</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
              }}
            >
              <Button variant={"outline"} className="w-full py-2" type="submit"><FcGoogle className="mr-2"/>Sign in with Google</Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/api/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    
    </div>
  )
}