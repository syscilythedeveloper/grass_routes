/* eslint-disable @typescript-eslint/no-explicit-any */
export async function joinCoffeeSession(session: any) {
  const response = await fetch(`/api/joinCoffeeSession`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  });

  if (!response.ok) {
    throw new Error("Failed to join coffee session");
  }

  return response.json();
}

export async function createCoffeeSession(session: any) {
  const response = await fetch(`/api/createCoffeeSession`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  });

  if (!response.ok) {
    throw new Error("Failed to create coffee session");
  }

  return response.json();
}
