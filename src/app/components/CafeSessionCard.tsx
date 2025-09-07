/* eslint-disable @next/next/no-img-element */
import React from "react";

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

export function CafeSessionCard({ session }: { session: CafeSession }) {
  const dateLabel = formatDateLabel(session.date);
  const timeLabel = formatTimeRange(session.startTime, session.endTime);

  return (
    <article className="relative overflow-hidden rounded-2xl shadow-md border border-gray-200">
      {/* Background image (blurred) */}
      <div className="relative h-64">
        <img
          src={session.locationImage}
          alt={`${session.title} location`}
          className="absolute inset-0 w-full h-full object-cover scale-105 "
        />
        {/* Soft gradient to improve readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/35" />
      </div>

      {/* Foreground content panel */}
      <div className="relative -mt-10 mx-4 mb-4 rounded-xl bg-white/90 backdrop-blur p-4 shadow">
        {/* Title & price-style chip area (optional badge spot) */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {session.title}
          </h3>
        </div>

        {/* Meta rows */}
        <p className="mt-1 text-sm text-gray-600">
          {dateLabel} • {timeLabel}
        </p>
        <p className="text-sm text-gray-600">
          {session.city} • {session.zipCode}
        </p>

        {/* Attendees */}
        <div className="mt-3">
          <div className="flex -space-x-2">
            {session.attendees.map((a, i) => (
              <div
                key={i}
                className="relative group"
              >
                <img
                  src={a.profilePic}
                  alt={a.name}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                />
                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {a.name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {session.attendees.length} attending
          </p>
        </div>
      </div>
    </article>
  );
}
