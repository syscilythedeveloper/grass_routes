import { NextRequest } from "next/server";
import { supabase } from "../../utils/supabase/server";
//import { getCloudinaryURL } from "../joinCoffeeSession/route";

export async function POST(req: NextRequest) {
  try {
    const coffeeMeetup = await req.json();
    //const photo = coffeeMeetup.photo as string;
    const title = coffeeMeetup.title as string;
    const date = coffeeMeetup.date as string;
    const startTime = coffeeMeetup.startTime as string;
    const endTime = coffeeMeetup.endTime as string;
    const name = coffeeMeetup.name as string;
    const locationImage = coffeeMeetup.locationImage as string;
    const zipCode = coffeeMeetup.zipCode as string;
    //   const locationImageUrl = await getCloudinaryURL(photo);
    //   console.log("Uploaded location image URL:", locationImageUrl);
    const locationImageUrl2 =
      "https://res.cloudinary.com/dbmgioxbm/image/upload/v1757307071/checkins/iwlijcbqp02wfth8wxjz.png";

    const result = await createCoffeeSession({
      title,
      startTime,
      endTime,
      date,
      zipCode,
      name,
      photoUrl: locationImageUrl2,
      locationImage,
    });

    console.log("Create coffee session result:", result);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error creating coffee session:", error);
    return new Response("Failed to create coffee session", { status: 500 });
  }
}

const createCoffeeSession = async ({
  title,
  date,
  startTime,
  endTime,
  zipCode,
  name,
  photoUrl,
  locationImage,
}: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  zipCode: string;
  name: string;
  photoUrl?: string | null;
  locationImage?: string | null;
}) => {
  try {
    const attendees = [{ name, profilePic: photoUrl }];

    const { data, error } = await supabase
      .from("coffee_meetups")
      .insert([
        {
          title,
          startTime,
          endTime,
          date,
          zipCode,
          locationImage,
          attendees: JSON.stringify(attendees),
          city: "Washington, D.C.",
        },
      ])
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return { success: true, session: data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMessage };
  }
};
