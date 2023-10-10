import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import SupabaseLogo from "../components/SupabaseLogo";
import NextJsLogo from "../components/NextJsLogo";
import DeployButton from "../components/DeployButton";
import { getUser } from "@/app/lib/get-user";
import { supabase } from "@/app/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const revalidate = 0;

export default async function Index() {
  // const user = await getUser();
  // console.log("111111111111111 ======> ", user);
  const { data, error } = await supabase.auth.refreshSession();
  const { session, user } = data;

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <DeployButton />
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <div className="flex gap-8 justify-center items-center">
            <Link href="https://supabase.com/" target="_blank">
              <SupabaseLogo />
            </Link>
            <span className="border-l rotate-45 h-6" />
            <NextJsLogo />
          </div>
          <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            The fastest way to start building apps with{" "}
            <strong>Supabase</strong> and <strong>Next.js</strong>
          </p>
          <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
            Get started by editing <strong>app/page.tsx</strong>
          </div>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Everything you need to get started
          </h2>
        </div>

        <div className="flex flex-col gap-8 text-foreground">
          <div className="grid gap-2 justify-center mx-auto text-center">
            <h2 className="text-lg font-bold text-center">Examples</h2>
            <p className="text-sm">
              Look in the <code>_examples</code> folder to see how to create a
              Supabase client in all the different contexts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
