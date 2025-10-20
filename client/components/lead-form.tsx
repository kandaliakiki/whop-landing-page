"use client";

import { useCallback, useMemo, useState } from "react";

const GAS_ENDPOINT = process.env.NEXT_PUBLIC_GAS_ENDPOINT as string | undefined;
const MALE_URL = process.env.NEXT_PUBLIC_WHOP_MALE_URL as string | undefined;
const FEMALE_URL = process.env.NEXT_PUBLIC_WHOP_FEMALE_URL as
  | string
  | undefined;

export default function LeadForm() {
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");

  const utm = useMemo(() => {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    return {
      utm_source: params.get("utm_source") || "",
      utm_campaign: params.get("utm_campaign") || "",
    };
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (GAS_ENDPOINT) {
        const referrer_host = document.referrer
          ? new URL(document.referrer).hostname
          : "";
        const final_utm_source = utm.utm_source || referrer_host || "";
        const payload = JSON.stringify({
          email,
          gender,
          utm_source: final_utm_source,
          utm_campaign: utm.utm_campaign,
          referrer_host,
        });
        try {
          await fetch(GAS_ENDPOINT, {
            method: "POST",
            mode: "no-cors",
            body: payload,
            keepalive: true,
          });
        } catch (err) {}
      }

      const target = gender === "male" ? MALE_URL : FEMALE_URL;
      if (target) {
        window.location.assign(target);
      }
    },
    [email, gender, utm]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        required
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 w-full rounded-md border px-3 py-2 text-base outline-none bg-white border-[color:var(--border)] focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]"
      />

      <div className="flex items-center justify-center gap-6 py-2">
        <label className="flex items-center gap-2" htmlFor="gender-male">
          <input
            id="gender-male"
            name="gender"
            type="radio"
            value="male"
            checked={gender === "male"}
            onChange={() => setGender("male")}
            className="size-4 rounded-full border border-[color:var(--border)] accent-[color:var(--primary)]"
            required
          />
          <span>Male</span>
        </label>
        <label className="flex items-center gap-2" htmlFor="gender-female">
          <input
            id="gender-female"
            name="gender"
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={() => setGender("female")}
            className="size-4 rounded-full border border-[color:var(--border)] accent-[color:var(--primary)]"
            required
          />
          <span>Female</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full h-11 rounded-md bg-[color:var(--primary)] text-white font-semibold hover:bg-[color:var(--primary-hover)] transition-colors"
      >
        Continue →
      </button>
    </form>
  );
}
