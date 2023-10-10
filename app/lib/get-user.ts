import { cookies } from "next/headers";
import { cache } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/app/lib/supabase";

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();

  return createServerComponentClient({ cookies: () => cookieStore });
});

export const getUser = async () => {
  // const supabase = createServerSupabaseClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
