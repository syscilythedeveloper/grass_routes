import { NextRequest } from "next/server";
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { supabase } from "../../utils/supabase/server";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const joinerInfo = await request.json();
    const name = joinerInfo.name as string;
    //const photo = joinerInfo.photo as string;
    //const picUrl = await getCloudinaryURL(photo);
    const picUrl =
      "https://res.cloudinary.com/dbmgioxbm/image/upload/v1757299141/checkins/dkoy6iacshdynr3vqqwi.png";
    const result = await joinSession(name, picUrl, joinerInfo.sessionId);

    //update supabase with new attendee info

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error joining coffee session:", error);
    return new Response("Failed to join coffee session", { status: 500 });
  }
}

export async function getCloudinaryURL(
  base64: string,
  opts?: Partial<UploadApiOptions>
) {
  // Remove the data URL prefix if present
  const base64Data = base64.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "checkins",
        eager: [
          {
            width: 300,
            height: 300,
            crop: "pad",
            format: "jpg",
          },
        ],
        eager_async: true,
        ...opts,
      },
      (err, result) => {
        if (err) return reject(err);
        if (!result || !result.secure_url)
          return reject(new Error("No result from Cloudinary"));
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

const joinSession = async (name: string, picUrl: string, sessionId: string) => {
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

    // Update session in Supabase
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
