/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function HitCard({ hit }: { hit: any }) {
  const handleCoffeeMeetUp = () => {
    console.log(`Create Meet-Up for ${hit.objectID}`);
    console.log(`Hit details:`, hit);
  };

  const imageUrl = hit.photos?.[0];
  const displayVibes = Array.isArray(hit.vibes) ? hit.vibes.slice(0, 3) : [];
  const locationText = [hit.neighborhood, hit.quadrant]
    .filter(Boolean)
    .join(" • ");

  return (
    <article
      className="bg-card border border-border rounded-xl shadow-venue-card overflow-hidden 
        transition-all duration-300 hover:shadow-venue-card-hover hover:scale-105"
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

        {/* Meta Row */}
        {locationText && (
          <p className="text-gray-500 text-base line-clamp-1">{locationText}</p>
        )}

        {typeof hit.ratingHint === "number" && (
          <div className="flex items-center gap-2 mt-1">
            ⭐️
            <span className="text-lg font-semibold text-gray-900">
              {hit.ratingHint.toFixed(1)}
            </span>
            {typeof hit.reviewCountHint === "number" && (
              <span className="text-base text-gray-500">
                ({hit.reviewCountHint})
              </span>
            )}
          </div>
        )}
        {Array.isArray(hit.music) && hit.music.length > 0 && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
            <span className="opacity-80">🎵</span>
            <span className="truncate">
              {hit.music.slice(0, 3).join(" • ")}
              {hit.music.length > 3 ? `  +${hit.music.length - 3}` : ""}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleCoffeeMeetUp}
            disabled={false}
            aria-label={`Create Link-Up for ${hit.name}`}
            className="bg-green-600 text-white hover:shadow-lg hover:scale-105 active:scale-95 rounded-2xl px-5 py-2"
          >
            Create MeetUp
          </button>
        </div>
      </div>
    </article>
  );
}
