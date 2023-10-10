import { cookies } from "next/headers";
import { cache } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();

  return createServerComponentClient({ cookies: () => cookieStore });
});

export const getUser = async () => {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return null;

    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};
