/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import JoinCoffeeSessionForm from "./JoinCoffeeSessionForm";

type Attendee = { name: string; profilePic: string };
type CafeSession = {
  id: number | string;
  title: string;
  startTime: string; // "18:00"
  endTime: string; // "21:00"
  date: string; // "2023-09-15"
  zipCode: string;
  city: string;
  attendees: Attendee[];
  locationImage: string;
};

function formatDateLabel(date: string) {
  try {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return date;
  }
}

function formatTimeRange(start: string, end: string) {
  const toLabel = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m || 0, 0, 0);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };
  return `${toLabel(start)} – ${toLabel(end)}`;
}

export function CafeSessionCard({
  coffeeSession,
}: {
  coffeeSession: CafeSession;
}) {
  const [showForm, setShowForm] = React.useState(false);
  const dateLabel = formatDateLabel(coffeeSession.date);
  const timeLabel = formatTimeRange(
    coffeeSession.startTime,
    coffeeSession.endTime
  );
  const attendees = Array.isArray(coffeeSession.attendees)
    ? coffeeSession.attendees
    : JSON.parse(coffeeSession.attendees);

  return (
    <article className="relative overflow-hidden rounded-2xl shadow-md border border-gray-200">
      {/* Background image (blurred) */}
      <div className="relative h-64">
        <img
          src={coffeeSession.locationImage}
          alt={`${coffeeSession.title} location`}
          className="absolute inset-0 w-full h-full object-cover scale-105 "
        />
        {/* Soft gradient to improve readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/35" />
      </div>

      {/* Foreground content panel */}
      <div className="relative -mt-10 mx-4 mb-4 rounded-xl bg-white/90 backdrop-blur p-4 shadow">
        {/* Title & price-style chip area (optional badge spot) */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {coffeeSession.title}
          </h3>
          <div className="relative group">
            <button
              className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-[#AB7854] text-white text-lg font-bold hover:bg-[#6F4E37] "
              aria-label="Join Session"
              onClick={() => setShowForm(true)}
            >
              +
            </button>
            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-10 whitespace-nowrap rounded-md bg-[#C9A992]/70 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
              Join Session
            </span>
          </div>
        </div>

        {/* Meta rows */}
        <p className="mt-1 text-sm text-gray-600">
          {dateLabel} • {timeLabel}
        </p>
        <p className="text-sm text-gray-600">
          {coffeeSession.city} • {coffeeSession.zipCode}
        </p>

        {/* Attendees row only */}
        <div className="mt-3 flex -space-x-2">
          {attendees.map((attendee: any) => (
            <div
              key={attendee.name}
              className="relative group"
            >
              <img
                src={attendee.profilePic}
                alt={attendee.name}
                className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              />
              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap rounded-md  bg-[#C9A992] px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {attendee.name}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          {attendees.length} attending
        </p>
      </div>
      {showForm && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
          <div className="max-w-full w-[350px]">
            <JoinCoffeeSessionForm
              sessionId={coffeeSession.id}
              onSubmitted={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </article>
  );
}
