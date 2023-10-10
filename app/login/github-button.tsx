"use client";

import React from "react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/app/lib/supabase";

export function GithubButton({ session }: { session: Session | null }) {
  // const supabase = createClientComponentClient();

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      // options: {
      //   redirectTo: "https://8749073b.supabase-nextjs-oauth-example.pages.dev",
      // },
    });

    if (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };
  return session ? (
    <button className="bg-white" onClick={handleLogout}>
      GitHub Logout
    </button>
  ) : (
    <button className="bg-white" onClick={handleGitHubLogin}>
      GitHub Login
    </button>
  );
}
