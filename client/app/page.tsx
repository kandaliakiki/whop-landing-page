"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const GAS_ENDPOINT = process.env.NEXT_PUBLIC_GAS_ENDPOINT || "";
const MALE_URL = process.env.NEXT_PUBLIC_WHOP_MALE_URL || "";
const FEMALE_URL = process.env.NEXT_PUBLIC_WHOP_FEMALE_URL || "";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show pulse immediately
    setIsRedirecting(true);
    setRedirectMessage(
      gender === "male"
        ? "✅ Verified. Redirecting you to Prime Lane…"
        : "✅ Verified. Redirecting you to Her Lane…"
    );

    const target = gender === "male" ? MALE_URL : FEMALE_URL;

    if (GAS_ENDPOINT) {
      const referrer_host = document.referrer
        ? new URL(document.referrer).hostname
        : "";
      const params = new URLSearchParams(window.location.search);
      const utm_source = params.get("utm_source") || "";
      const utm_campaign = params.get("utm_campaign") || "";
      const final_utm_source = utm_source || referrer_host || "";

      const payload = JSON.stringify({
        email,
        gender,
        utm_source: final_utm_source,
        utm_campaign,
        referrer_host,
      });

      try {
        fetch(GAS_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: payload,
          keepalive: true,
        })
          .catch(() => {})
          .finally(() => {
            if (target) router.push(target);
          });
        return;
      } catch (err) {
        if (target) router.push(target);
        return;
      }
    }
    if (target) router.push(target);
  };

  if (isRedirecting) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: gender === "male" ? "#FFFFFF" : "#FAFAF7" }}
      >
        <div className="w-[90%] max-w-[360px] text-center">
          <div className="pulse-loader">
            <div className="success-pulse"></div>
          </div>
          <p className="text-[#1E1E1E] text-lg font-medium mt-4">
            {redirectMessage}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: gender === "male" ? "#FFFFFF" : "#FAFAF7" }}
    >
      <div className="w-[90%] max-w-[360px] text-center">
        <h2 className="text-[1.6rem] font-semibold mb-2 text-[#1E1E1E]">
          Prove you're not a bot.
          <span className="gold-arrow">→</span>
        </h2>
        <p className="mb-6 text-base text-[#6E6E6E]">
          Just in time for the holidays — verify below to access your private
          lane before it closes.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            required
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-lg border-0 px-4 py-3 text-base outline-none bg-white shadow-sm focus:ring-2 focus:ring-[#E7B8A5] transition-all"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          />

          <div className="flex items-center justify-center gap-6 py-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                name="gender"
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="size-5 rounded-full border-2 border-[#E7B8A5] accent-[#E7B8A5]"
                required
              />
              <span className="text-[#1E1E1E] font-medium">Female</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                name="gender"
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="size-5 rounded-full border-2 border-[#255DF6] accent-[#255DF6]"
                required
              />
              <span className="text-[#1E1E1E] font-medium">Male</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-lg text-white font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: gender === "male" ? "#255DF6" : "#E7B8A5",
              color: gender === "male" ? "#FFFFFF" : "#2F3439",
              boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
            }}
          >
            Continue →
          </button>
        </form>
      </div>
    </main>
  );
}
