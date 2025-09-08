/* eslint-disable @typescript-eslint/no-explicit-any */
export async function joinCoffeeSession(session: any) {
  console.log(`Joining session step1:`, session);
  const response = await fetch(`/api/joinCoffeeSession`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  });

  if (!response.ok) {
    throw new Error("Failed to create challenge");
  }

  return response.json();
}
