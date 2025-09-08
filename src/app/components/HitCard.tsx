/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CreateCoffeeSessionForm from "./createCoffeeSession";

export default function HitCard({ hit }: { hit: any }) {
  const [showForm, setShowForm] = useState(false);

  const handleCoffeeMeetUp = () => {
    setShowForm(true);
    console.log(`Create Meet-Up for ${hit.objectID}`);
    console.log(`Hit details:`, hit);
  };

  const imageUrl = hit.photos?.[0];
  const displayVibes = Array.isArray(hit.vibes) ? hit.vibes.slice(0, 3) : [];
  const locationText = ["Washington, DC", hit.zipCode]
    .filter(Boolean)
    .join(" • ");

  return (
    <article
      className="bg-card border border-border rounded-xl shadow-venue-card overflow-hidden 
        transition-all duration-300 hover:shadow-venue-card-hover hover:scale-105 relative"
    >
      {/* Vibes above image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 flex items-center justify-center">
        {displayVibes.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {displayVibes.map((vibe: string, index: number) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-base font-semibold shadow"
              >
                {vibe}
              </span>
            ))}
            {Array.isArray(hit.vibes) && hit.vibes.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-base font-semibold shadow">
                +{hit.vibes.length - 3}
              </span>
            )}
          </div>
        )}
        <img
          src={imageUrl}
          alt={hit.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Title Row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-2xl text-gray-900 leading-tight line-clamp-2 flex-1">
            {hit.name}
          </h3>
          {hit.price && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold shrink-0">
              {hit.price}
            </span>
          )}
        </div>

        {/* Meta Row: Location left, rating far right */}
        {(locationText || typeof hit.ratingHint === "number") && (
          <div className="flex items-center justify-between mt-1">
            {locationText && (
              <span className="text-gray-500 text-base line-clamp-1">
                {locationText}
              </span>
            )}
            {typeof hit.ratingHint === "number" && (
              <span className="flex items-center gap-1">
                <span>⭐️</span>
                <span className="text-lg font-semibold text-gray-900">
                  {hit.ratingHint.toFixed(1)}
                </span>
                {typeof hit.reviewCountHint === "number" && (
                  <span className="text-base text-gray-500">
                    ({hit.reviewCountHint})
                  </span>
                )}
              </span>
            )}
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleCoffeeMeetUp}
            disabled={false}
            aria-label={`Create Link-Up for ${hit.name}`}
            className="bg-[#8C6345] text-white hover:shadow-lg hover:scale-105 active:scale-95 rounded-2xl px-5 py-2"
          >
            Create Coffee Meetup
          </button>
        </div>
      </div>
      {showForm && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40">
          <div className="w-full ">
            <CreateCoffeeSessionForm
              title={hit.title || hit.name}
              onSubmitted={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </article>
  );
}
