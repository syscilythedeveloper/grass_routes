/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";

export default function CreateCoffeeSessionForm({
  title,
  onSubmitted,
}: {
  title: string;
  onSubmitted?: () => void;
}) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate min and max date for the date input
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 7);
  const maxDate = maxDateObj.toISOString().split("T")[0];

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
    // You can send { title, date, startTime, endTime, name, photo } to your backend here
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
        aria-labelledby="coffee-create-form-title"
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
            <h2
              id="coffee-create-form-title"
              className="text-lg font-semibold tracking-wide"
            >
              Create Coffee Meetup for {title}
            </h2>
          </div>

          {/* Body */}
          <div className="px-6 py-6 bg-foam">
            {/* Date, Start Time, End Time Row */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={submitted}
                  min={minDate}
                  max={maxDate}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8C6345]"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <select
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={submitted}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8C6345]"
                  required
                >
                  <option value="">Select</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = 6 + i;
                    const ampm = hour < 12 ? "am" : "pm";
                    const displayHour = hour <= 12 ? hour : hour - 12;
                    return (
                      <option
                        key={hour}
                        value={`${hour.toString().padStart(2, "0")}:00`}
                      >
                        {`${displayHour}:00 ${ampm}`}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <select
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={submitted}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8C6345]"
                  required
                >
                  <option value="">Select</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = 7 + i;
                    const ampm = hour < 12 ? "am" : "pm";
                    const displayHour = hour <= 12 ? hour : hour - 12;
                    return (
                      <option
                        key={hour}
                        value={`${hour.toString().padStart(2, "0")}:00`}
                      >
                        {`${displayHour}:00 ${ampm}`}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
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
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white/80 px-3 py-2 text-stone-900 placeholder-stone-400 shadow-sm outline-none transition focus:border-[#6F4E37] focus:ring-2 focus:ring-[#C7B299] mb-4"
              required
              aria-required
            />
            {/* Photo */}
            <div className="mt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-stone-700"
              >
                Your Photo
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={
                  (photo
                    ? "mt-1 rounded-full cursor-pointer mx-auto"
                    : "mt-1 flex items-center justify-center rounded-full border-2 border-dashed h-14 w-14 mx-auto cursor-pointer ") +
                  (isDragging && !photo
                    ? " border-[#3E7B67] bg-[#3E7B67]/5"
                    : !photo
                    ? " border-stone-300 bg-white/60 hover:bg-white/80"
                    : " border-stone-300 bg-transparent")
                }
                style={
                  photo
                    ? { background: "transparent" }
                    : { minHeight: "56px", minWidth: "56px" }
                }
                onClick={() => !photo && fileInputRef.current?.click()}
              >
                {!photo && (
                  <div className="flex flex-col items-center justify-center h-full w-full select-none">
                    <span className="text-stone-700 text-[8px] font-medium text-center">
                      Upload Photo
                    </span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={submitted}
                  className="hidden"
                />
                {photo && (
                  <img
                    src={photo}
                    alt="Preview"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-[#C7B299] mx-auto"
                  />
                )}
              </div>
            </div>
            {/* Submit */}
            <button
              type="submit"
              disabled={
                submitted || !name.trim() || !date || !startTime || !endTime
              }
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3E7B67] px-4 py-3 font-semibold text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>Create Coffee Meetup</span>
            </button>
            {submitted && (
              <div className="mt-4 rounded-xl border border-[#C7B299] bg-[#FFF8F0] px-4 py-3 text-sm text-stone-800">
                <strong>Thanks, {name}!</strong> Your coffee meetup is created!
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
