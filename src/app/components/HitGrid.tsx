/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useHits } from "react-instantsearch";
import HitCard from "./HitCard";

function HitGrid() {
  const { items } = useHits();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {items.map((hit: any) => (
        <HitCard
          key={hit.objectID}
          hit={hit}
        />
      ))}
    </div>
  );
}

export default HitGrid;
