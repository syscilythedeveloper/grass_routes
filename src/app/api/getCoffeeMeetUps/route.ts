import { supabase } from "../../utils/supabase/server";
export const runtime = "nodejs";
export async function GET() {
  try {
    const { data: coffeeMeetups, error } = await supabase
      .from("coffee_meetups")
      .select("*")
      .order("date", { ascending: true });

    if (error) throw error;
    console.log("Fetched coffee meetups:", coffeeMeetups);

    return new Response(JSON.stringify(coffeeMeetups), { status: 200 });
  } catch (error) {
    console.error("Error fetching coffee meetups:", error);
    return new Response("Failed to fetch coffee meetups", { status: 500 });
  }
}
