"use client";

import { useSearchParams } from "next/navigation";

const MALE_URL = process.env.NEXT_PUBLIC_WHOP_MALE_URL || "";
const FEMALE_URL = process.env.NEXT_PUBLIC_WHOP_FEMALE_URL || "";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const laneParam = searchParams.get("lane");
  const gender = laneParam === "primelane" ? "male" : "female";

  const handleAccessLane = () => {
    const target = gender === "male" ? MALE_URL : FEMALE_URL;
    if (target) window.location.href = target;
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: gender === "male" ? "#FFFFFF" : "#FAFAF7" }}
    >
      <div className="w-[90%] max-w-[320px] sm:max-w-[400px] text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-semibold mb-4 text-[#1E1E1E]">
          Welcome to {gender === "male" ? "Prime Lane" : "Her Lane"}!
        </h2>
        <p className="text-[#6E6E6E] mb-6">
          Your subscription is active. You'll receive access details via email.
        </p>
        <button
          onClick={handleAccessLane}
          className="w-full bg-[#1E1E1E] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#333] transition-colors"
        >
          Access Your Lane →
        </button>
      </div>
    </main>
  );
}
