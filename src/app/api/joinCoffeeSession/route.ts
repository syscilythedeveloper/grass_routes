import { NextRequest } from "next/server";

import { supabase } from "../../utils/supabase/server";
import { getCloudinaryURL } from "../../../lib/cloundinary";

export async function PUT(request: NextRequest) {
  try {
    const joinerInfo = await request.json();
    const name = joinerInfo.name as string;
    const photo = joinerInfo.photo as string;
    const picUrl = await getCloudinaryURL(photo);

    const result = await joinCoffeeMeetup(name, picUrl, joinerInfo.sessionId);

    //update supabase with new attendee info

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error joining coffee session:", error);
    return new Response("Failed to join coffee session", { status: 500 });
  }
}

const joinCoffeeMeetup = async (
  name: string,
  picUrl: string,
  sessionId: string
) => {
  try {
    // Fetch current attendees
    const { data: session, error: fetchError } = await supabase
      .from("coffee_meetups")
      .select("attendees")
      .eq("id", sessionId)
      .single();

    if (fetchError || !session) {
      throw new Error("Session not found");
    }

    // Parse attendees array (if stringified)
    const attendees = Array.isArray(session.attendees)
      ? session.attendees
      : JSON.parse(session.attendees || "[]");

    // Add new attendee
    attendees.push({ name, profilePic: picUrl });

    // Update coffee_meetup in Supabase
    const { error: updateError } = await supabase
      .from("coffee_meetups")
      .update({ attendees: JSON.stringify(attendees) })
      .eq("id", sessionId);

    if (updateError) {
      throw new Error("Failed to update attendees");
    }

    return { success: true, attendees };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMessage };
  }
};
