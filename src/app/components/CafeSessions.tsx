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
    <div className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Upcoming Cafe Sessions
      </h2>

      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent className="-ml-1">
          {coffeeMeetups?.map((session: any, index: number) => (
            <CarouselItem
              key={session.id || index}
              className="pl-1 basis-1/3"
            >
              <div className="p-1 h-full">
                <CafeSessionCard session={session} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CafeSessions;
