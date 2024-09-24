import GlobeComponent from "@/components/GlobeComponent"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "../../../../auth"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Signin() {
  return (
    <div className="w-full h-screen dark:bg-black bg-white grid">
      <div className="absolute top-8 left-10">
        <Link href="/" className="text-muted-foreground">← Back to SitePulse</Link>
      </div>
      {/* <div className="flex items-center justify-center py-12 mt-2">
        <GlobeComponent />
      </div> */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
              <form
      action={async (formData) => {
        "use server"
        await signIn("resend", formData)
      }}
    >
      <Input
                name="email"
                type="text"
                placeholder="hello@example.com"
                required
              />
      <Button type="submit" className="w-full mt-5">
              Login with Email
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
              <Button variant={"outline"} className="w-full py-2 text-md" type="submit"><FcGoogle className="mr-2"/>Login with Google</Button>
            </form>
            <form
              action={async () => {
                "use server"
                await signIn("github", { redirectTo: "/dashboard" })
              }}
            >
              <Button variant={"outline"} className="w-full py-2 text-md" type="submit"><FaGithub className="mr-2"/>Login with Github</Button>
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