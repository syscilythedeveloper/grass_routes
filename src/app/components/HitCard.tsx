/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CreateCoffeeSessionForm from "./createCoffeeSessionForm";
import { GrLocation } from "react-icons/gr";

export default function HitCard({ hit }: { hit: any }) {
  // Helper to format 24h time to 12h
  function formatTime(t: string) {
    const [h, m] = t.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m || 0);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  // Grouped hours: Weekdays (Mon-Fri, use Monday's time), Saturday, Sunday
  const groupedHours: Array<{ label: string; times: string }> = [];
  if (hit.hours && typeof hit.hours === "object") {
    // Get Monday's time for weekdays
    let weekdayTimes = "";
    if (Array.isArray(hit.hours.mon) && hit.hours.mon.length) {
      weekdayTimes = hit.hours.mon
        .map(
          ([start, end]: [string, string]) =>
            `${formatTime(start)} - ${formatTime(end)}`
        )
        .join(", ");
    }
    // Saturday
    let saturdayTimes = "";
    if (Array.isArray(hit.hours.sat) && hit.hours.sat.length) {
      saturdayTimes = hit.hours.sat
        .map(
          ([start, end]: [string, string]) =>
            `${formatTime(start)} - ${formatTime(end)}`
        )
        .join(", ");
    }
    // Sunday
    let sundayTimes = "";
    if (Array.isArray(hit.hours.sun) && hit.hours.sun.length) {
      sundayTimes = hit.hours.sun
        .map(
          ([start, end]: [string, string]) =>
            `${formatTime(start)} - ${formatTime(end)}`
        )
        .join(", ");
    }
    if (weekdayTimes)
      groupedHours.push({ label: "Weekdays", times: weekdayTimes });
    if (saturdayTimes)
      groupedHours.push({ label: "Saturday", times: saturdayTimes });
    if (sundayTimes) groupedHours.push({ label: "Sunday", times: sundayTimes });
  }
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
      className="border border-amber-900 rounded-xl shadow-venue-card overflow-hidden
        transition-all duration-300 hover:shadow-venue-card-hover hover:scale-105 relative  bg-amber-900/20"
    >
      {/* Price pill at top right */}
      {hit.price && (
        <span className="absolute top-4 right-4 z-10 bg-green-200/40 text-white px-4 py-1 rounded-full text-lg font-semibold shadow">
          {hit.price}
        </span>
      )}
      {/* Vibes above image and star rating pill bottom left */}
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
        {/* Star rating pill bottom left, always show rating, show review count on hover */}
        {typeof hit.ratingHint === "number" && (
          <span className="absolute bottom-4 left-4 z-20 bg-yellow-200/70 text-gray-900 font-bold px-4 py-1 rounded-full text-base shadow group cursor-pointer flex items-center gap-1">
            <span>⭐️</span>
            <span>{hit.ratingHint.toFixed(1)}</span>
            {typeof hit.reviewCountHint === "number" && (
              <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {hit.reviewCountHint} reviews
              </span>
            )}
          </span>
        )}
        <img
          src={imageUrl}
          alt={hit.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 "
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3 bg-gradient-to-b from-amber-800/10 via-amber-100/20 to-amber-800/20 ">
        {/* Title Row with city/zip far right */}
        <div className="flex items-center justify-between gap-2 flex-wrap ">
          <h3 className="font-bold text-2xl text-gray-900 leading-tight line-clamp-2 flex-1">
            {hit.name}
          </h3>
          {locationText && (
            <span className="text-gray-700 text-base truncate ml-4">
              <GrLocation className="inline-block mr-1" />
              {locationText}
            </span>
          )}
        </div>

        {/* Description and hours row */}
        {groupedHours.length > 0 && (
          <div className="flex gap-8 items-start mt-1 mb-1">
            <div className="relative p-3 rounded-lg w-[300px] border border-amber-600 overflow-hidden">
              {/* Gradient overlay for readability, matches CafeSessionCard */}
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-100/70 via-amber-200/20 to-amber-100/10 pointer-events-none" />
              <div className="relative z-10">
                <span className="font-bold text-gray-800 text-base block mb-1">
                  Hours:
                </span>
                <div className="space-y-1">
                  {groupedHours.map(({ label, times }) => (
                    <div
                      key={label}
                      className="text-gray-700 text-base"
                    >
                      {label}: {times}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 text-gray-700 text-base mt-2">
              description of coffee shop goes here. description of coffee shop
              goes here. description of coffee shop goes here. description of
              coffee shop goes here.
            </div>
          </div>
        )}

        {/* CTA Button and rating row */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            onClick={handleCoffeeMeetUp}
            disabled={false}
            aria-label={`Create Link-Up for ${hit.name}`}
            className="bg-amber-800/50 text-white hover:shadow-lg hover:scale-105 active:scale-95 rounded-2xl px-5 py-2 border"
          >
            ☕️ Create Coffee Meetup
          </button>
        </div>
      </div>
      {showForm && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40">
          <div className="w-full ">
            <CreateCoffeeSessionForm
              title={hit.title || hit.name}
              locationImage={imageUrl}
              zipCode={hit.zipCode}
              onSubmitted={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </article>
  );
}
