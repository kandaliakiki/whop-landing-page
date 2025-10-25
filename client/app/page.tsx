"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WhopCheckoutEmbed } from "@whop/checkout/react";

const GAS_ENDPOINT = process.env.NEXT_PUBLIC_GAS_ENDPOINT || "";
const MALE_URL = process.env.NEXT_PUBLIC_WHOP_MALE_URL || "";
const FEMALE_URL = process.env.NEXT_PUBLIC_WHOP_FEMALE_URL || "";
const MALE_PLAN_ID = process.env.NEXT_PUBLIC_WHOP_MALE_PLAN_ID || "";
const FEMALE_PLAN_ID = process.env.NEXT_PUBLIC_WHOP_FEMALE_PLAN_ID || "";
const SHOW_TEST_BUTTON = process.env.NEXT_PUBLIC_SHOW_TEST_BUTTON === "true";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  // Handle checkout completion (works for both real checkout and test)
  const handleCheckoutComplete = (planId?: string, receiptId?: string) => {
    console.log("Checkout completed!", { planId, receiptId });
    // Redirect to success page using router
    const successUrl =
      gender === "male" ? "/success?lane=primelane" : "/success?lane=herlane";
    router.push(successUrl);
  };

  // Handle lane parameter from URL
  useEffect(() => {
    const laneParam = searchParams.get("lane");

    if (laneParam === "herlane") {
      setGender("female");
    } else if (laneParam === "primelane") {
      setGender("male");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show pulse immediately
    setIsRedirecting(true);
    setRedirectMessage(
      gender === "male" ? "Welcome to Prime Lane 🔥" : "Welcome to Her Lane 💫"
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
        }).catch(() => {});
      } catch (err) {
        // ignore
      }
    }
    // Show checkout instead of redirecting
    setTimeout(() => {
      setIsRedirecting(false);
      setShowCheckout(true);
    }, 2000);
  };

  if (isRedirecting) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: gender === "male" ? "#FFFFFF" : "#FAFAF7" }}
      >
        <div className="w-[90%] max-w-[320px] sm:max-w-[400px] text-center">
          <h3 className="text-xl font-semibold text-[#1E1E1E]">
            {redirectMessage}
          </h3>
          <p className="text-[#6E6E6E] mt-1">
            Redirecting to your exclusive lane…
          </p>

          <div className="redirect-loader mt-12">
            <div className="pulse-ring"></div>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Show checkout after verification
  if (showCheckout) {
    return (
      <main
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: gender === "male" ? "#FFFFFF" : "#FAFAF7" }}
      >
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-[#1E1E1E]">
              {gender === "male"
                ? "🔥 Prime Lane Checkout"
                : "💫 Her Lane Checkout"}
            </h2>
            <p className="text-sm sm:text-lg text-[#6E6E6E]">
              Complete your subscription to access your exclusive lane
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            {/* TEST BUTTON - Only show if enabled in environment */}
            {SHOW_TEST_BUTTON && (
              <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800 mb-2">🧪 TESTING MODE</p>
                <button
                  onClick={() => handleCheckoutComplete()}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Simulate Checkout Complete (TEST ONLY)
                </button>
              </div>
            )}

            {/* Responsive Whop Checkout Container */}
            <div className="w-full" style={{ minHeight: "600px" }}>
              <WhopCheckoutEmbed
                planId={gender === "male" ? MALE_PLAN_ID : FEMALE_PLAN_ID}
                theme="light"
                onComplete={handleCheckoutComplete}
                skipRedirect={true}
                fallback={
                  <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading checkout...</p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: gender === "male" ? "#FFFFFF" : "#FAFAF7" }}
    >
      <div className="w-[90%] max-w-[320px] sm:max-w-[400px] text-center">
        <h2 className="text-[1.4rem] sm:text-[2rem] font-semibold mb-2 text-[#1E1E1E]">
          Prove you're not a bot.
        </h2>
        <p className="mb-6 text-sm sm:text-lg text-[#6E6E6E]">
          Just in time for the holidays — verify below to access your private
          lane before it closes.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-xl pointer-animated" aria-hidden>
              👉
            </span>
            <input
              required
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 sm:h-10 flex-1 rounded-lg px-4 py-3 text-sm sm:text-lg outline-none bg-white transition-all border"
              style={{
                borderColor: gender === "male" ? "#255DF6" : "#E7B8A5",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            />
            <span className="text-2xl sm:text-xl invisible" aria-hidden>
              👉
            </span>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-4 py-3">
            <label className="flex items-center gap-3 sm:gap-2 cursor-pointer">
              <input
                name="gender"
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="size-5 sm:size-4 rounded-full border-2 border-[#E7B8A5] accent-[#E7B8A5]"
                required
              />
              <span className="text-[#1E1E1E] font-medium text-sm sm:text-lg">
                Female
              </span>
            </label>
            <label className="flex items-center gap-3 sm:gap-2 cursor-pointer">
              <input
                name="gender"
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="size-5 sm:size-4 rounded-full border-2 border-[#255DF6] accent-[#255DF6]"
                required
              />
              <span className="text-[#1E1E1E] font-medium text-sm sm:text-lg">
                Male
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 sm:h-10 rounded-lg text-white font-semibold transition-all hover:opacity-90 text-sm sm:text-lg"
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
