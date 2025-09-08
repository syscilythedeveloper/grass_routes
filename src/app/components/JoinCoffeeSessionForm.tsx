/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef } from "react";
import { joinCoffeeSession } from "../cafeSessionFunctions";

export default function JoinCoffeeSessionForm({
  sessionId,
  onSubmitted,
}: {
  sessionId: string | number;
  onSubmitted?: () => void;
}) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinCoffeeSession({ name, photo, sessionId });
    setSubmitted(true);
    setTimeout(() => {
      onSubmitted?.();
    }, 1500);
  };

  const handleClose = () => onSubmitted?.();

  return (
    <div
      className="relative min-h-[60vh] w-full flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(1200px 400px at 50% -200px, #F8F3EC 0%, #F1E8DE 40%, #E8DCCD 60%, #DCCBB8 75%, #C3A68F 100%)",
      }}
    >
      {/* subtle noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 160 160\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.25\\'/></svg>')",
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md"
        aria-labelledby="coffee-form-title"
      >
        {/* Card */}
        <div className="rounded-2xl shadow-xl overflow-hidden border border-stone-200 bg-foam/60 backdrop-blur-sm">
          {/* Header */}
          <div className="relative px-6 pt-4 pb-4 bg-gradient-to-b from-[#6F4E37] to-[#4E342E] text-foam">
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Close form"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 bg-foam">
            {/* Name */}
            <label
              htmlFor="name"
              className="block text-sm font-medium text-stone-700"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={submitted}
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white/80 px-3 py-2 text-stone-900 placeholder-stone-400 shadow-sm outline-none transition focus:border-[#6F4E37] focus:ring-2 focus:ring-[#C7B299]"
              required
              aria-required
            />

            {/* Photo */}
            <div className="mt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-stone-700"
              >
                Your Photo (optional)
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={
                  "mt-1 flex items-center justify-center rounded-xl border-2 border-dashed p-4 text-sm transition " +
                  (isDragging
                    ? "border-[#3E7B67] bg-[#3E7B67]/5"
                    : "border-stone-300 bg-white/60 hover:bg-white/80")
                }
              >
                <div className="text-center">
                  <p className="text-stone-700">
                    Drag & drop a photo here, or
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="ml-1 underline decoration-[#6F4E37] underline-offset-4 hover:text-[#6F4E37]"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    PNG/JPG, up to ~5MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={submitted}
                  className="hidden"
                />
              </div>

              {photo && (
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={photo}
                    alt="Preview"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-[#C7B299]"
                  />
                  <div className="text-xs text-stone-600">
                    <p className="font-medium">Preview</p>
                    <p className="">Looking good! ☕📸</p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitted || !name.trim()}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3E7B67] px-4 py-3 font-semibold text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>Save my spot</span>
              <LeafIcon className="h-4 w-4" />
            </button>

            {submitted && (
              <div className="mt-4 rounded-xl border border-[#C7B299] bg-[#FFF8F0] px-4 py-3 text-sm text-stone-800">
                <strong>Thanks, {name}!</strong>
                We&apos;ll see you at the meetup. ☕
              </div>
            )}
          </div>

          {/* Footer ribbon with beans */}
          <div className="relative h-10 bg-[#4E342E]">
            <BeansDivider />
          </div>
        </div>
      </form>
    </div>
  );
}

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 12c7-7 18-7 18-7s0 11-7 18C10 26 3 19 3 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BeansDivider() {
  return (
    <svg
      viewBox="0 0 800 40"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <rect
        width="800"
        height="40"
        fill="#4E342E"
      />
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 20 + i * 38;
        const y = 8 + (i % 2) * 10;
        return (
          <g
            key={i}
            transform={`translate(${x}, ${y}) rotate(${(i % 4) * 12})`}
          >
            <ellipse
              cx="0"
              cy="0"
              rx="10"
              ry="7"
              fill="#6F4E37"
            />
            <path
              d="M-6 -1 C -2 2, 2 -2, 6 1"
              stroke="#3B2A21"
              strokeWidth="2"
              fill="none"
            />
          </g>
        );
      })}
    </svg>
  );
}
