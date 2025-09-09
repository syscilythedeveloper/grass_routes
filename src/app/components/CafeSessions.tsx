/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CafeSessionCard } from "./CafeSessionCard";
import { getCoffeeMeetUps } from "../cafeSessionFunctions";

import React, { useEffect, useState } from "react";

const CafeSessions = () => {
  const [coffeeMeetups, setCoffeeMeetups] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await getCoffeeMeetUps();
      setCoffeeMeetups(res);
    }
    fetchData();
  }, []);

  return (
    <section className="my-4">
      <h1 className="text-4xl font-bold mb-4 text-center mr-2 ml-5">
        🌱 Grounds for Connection 🌱
      </h1>
      <h2 className="text-center text-lg text-gray-600 mb-6 px-4 max-w-2xl mx-auto italic">
        Not home, not work — discover your third place for coffee and community.
      </h2>

      {/* full-bleed wrapper */}
      <div
        className="relative justify-center left-1/2 right-1/2 -mx-[50vw] w-screen 
                      pl-[max(1rem,calc(50vw-50%))] pr-[max(1rem,calc(50vw-50%))]"
      >
        <Carousel className="w-450 mx-auto">
          {/* increase gutter a bit since we're full-bleed */}
          <CarouselContent className="-ml-3 sm:-ml-4">
            {coffeeMeetups.map((session: any, i: number) => (
              <CarouselItem
                key={session.id ?? i}
                className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="h-full">
                  <CafeSessionCard coffeeSession={session} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#AB7854] text-amber-200" />
          <CarouselNext className="bg-[#AB7854] text-amber-200" />
        </Carousel>
      </div>
    </section>
  );
};

export default CafeSessions;
