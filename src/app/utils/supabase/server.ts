import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const { data: coffeeMeetups } = await supabase
  .from("coffee_meetups")
  .select("*")
  .order("date", { ascending: true });
