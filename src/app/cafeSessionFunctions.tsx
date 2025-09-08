/* eslint-disable @typescript-eslint/no-explicit-any */

export async function joinCoffeeSession(session: any) {
  const response = await fetch(`/api/joinCoffeeSession`, {
    method: "PUT",
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

export async function getCoffeeMeetUps() {
  const response = await fetch(`/api/getCoffeeMeetUps`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch coffee meetups");
  }

  return response.json();
}
