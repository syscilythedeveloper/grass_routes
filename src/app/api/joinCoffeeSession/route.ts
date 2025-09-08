import { NextRequest } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(request: NextRequest) {
  try {
    const coffeeSession = await request.json();
    const result = await joinSession(coffeeSession);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error joining coffee session:", error);
    return new Response("Failed to join coffee session", { status: 500 });
  }
}

const joinSession = async (session: any) => {
  console.log(`Joining session from server side:`, session);
};
