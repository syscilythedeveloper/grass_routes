/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import JoinCoffeeSessionForm from "./JoinCoffeeSessionForm";
import { LuClock } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";

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
    <article className="relative overflow-hidden rounded-2xl shadow-md border border-amber-600/40 bg-amber-900/60 transition-transform duration-200 ease-out hover:-translate-y-2">
      {/* Date pill at top right */}
      <span className="absolute top-4 left-4 z-10 bg-amber-800/80  text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
        {dateLabel}
      </span>
      {/* Background image (blurred) */}
      <div className="relative h-64">
        <img
          src={coffeeSession.locationImage}
          alt={`${coffeeSession.title} location`}
          className="absolute inset-0 w-full h-full object-cover scale-105 border-2 border-gray-700 shadow-lg"
        />
        {/* Soft gradient to improve readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/35" />
      </div>

      {/* Foreground content panel */}

      <div className="relative -mt-10 mx-4 mb-4 rounded-xl bg-amber-100/50 backdrop-blur p-4 shadow border border-amber-600/40 overflow-hidden">
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-100/70 via-amber-200/20 to-amber-100/10 pointer-events-none" />
        <div className="relative z-10">
          {/* Title & price-style chip area (optional badge spot) */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
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

          <p className="text-lg text-gray-600">
            <LuClock className="inline-block mr-1" /> {timeLabel}
          </p>

          <p className="text-lg text-gray-600">
            <GrLocation className="inline-block mr-1" /> {coffeeSession.city} •{" "}
            {coffeeSession.zipCode}
          </p>

          {/* Attendees row: icon and avatars left, count right */}
          <div className="mt-3 flex items-center justify-between w-full">
            <div className="flex items-center">
              <TbUsers className="text-xl text-gray-600 mr-2" />
              <div className="flex -space-x-2">
                {attendees.map((attendee: any) => (
                  <div
                    key={attendee.name}
                    className="relative group"
                  >
                    <img
                      src={attendee.profilePic}
                      alt={attendee.name}
                      className="w-9 h-9 rounded-full border-2 border-amber-500/50 object-cover shadow-sm"
                    />
                    {/* Tooltip on hover */}
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap rounded-md  bg-[#C9A992] px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {attendee.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {attendees.length} attending
            </span>
          </div>
        </div>
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
