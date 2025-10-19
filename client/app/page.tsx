"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const GAS_ENDPOINT = process.env.NEXT_PUBLIC_GAS_ENDPOINT as string | undefined;
const MALE_URL = process.env.NEXT_PUBLIC_WHOP_MALE_URL as string | undefined;
const FEMALE_URL = process.env.NEXT_PUBLIC_WHOP_FEMALE_URL as
  | string
  | undefined;

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const utm = useMemo(
    () => ({
      utm_source: params.get("utm_source") || "",
      utm_campaign: params.get("utm_campaign") || "",
    }),
    [params]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // Log to Google Apps Script: avoid CORS preflight and ensure it sends before redirect
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
            mode: "no-cors", // no headers to avoid preflight; Apps Script reads e.postData.contents
            body: payload,
            keepalive: true,
          });
        } catch (err) {
          console.error("log failed", err);
        }
      }

      const target = gender === "male" ? MALE_URL : FEMALE_URL;
      router.push(target || "/");
    },
    [email, gender, router, utm]
  );

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-[360px] text-center">
        <h2 className="text-[1.6rem] font-semibold mb-2">Get early access.</h2>
        <p className="mb-6 text-base opacity-90">
          Drop your email and pick your side.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            required
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <RadioGroup
            value={gender}
            onValueChange={(v) => setGender(v as "male" | "female")}
            className="flex items-center justify-center gap-6 py-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem id="gender-male" value="male" aria-label="Male" />
              <label htmlFor="gender-male">Male</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                id="gender-female"
                value="female"
                aria-label="Female"
              />
              <label htmlFor="gender-female">Female</label>
            </div>
          </RadioGroup>

          <Button type="submit" className="w-full h-11">
            Continue →
          </Button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Limited pre-sale access ·{" "}
          <a className="text-[color:var(--accent)]" href="#">
            Don’t miss out
          </a>
        </p>
      </div>
    </main>
  );
}
