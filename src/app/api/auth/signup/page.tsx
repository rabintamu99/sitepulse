import GlobeComponent from "@/components/GlobeComponent"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "../../../../auth"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Signup() {
  return (
    <div className="w-full h-screen dark:bg-black bg-white grid">
      <div className="absolute top-8 left-10">
        <Link href="/" className="text-muted-foreground">← Back to SitePulse</Link>
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
          <h2 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            SitePulse
          </h2>
            <p className="text-balance text-muted-foreground">
              Signup to your account using Github or Google
            </p>
          </div>
          <div className="grid gap-4 mt-10">
              <form
              action={async () => {
                "use server"
                await signIn("github", { redirectTo: "/dashboard" })
              }}
            >
              <Button variant={"outline"} className="w-full py-2" type="submit"><FaGithub className="mr-2"/>Continue with Github</Button>
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
              <Button variant={"outline"} className="w-full py-2" type="submit"><FcGoogle className="mr-2"/>Continue with Google</Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}