"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const GAS_ENDPOINT = process.env.NEXT_PUBLIC_GAS_ENDPOINT || "";
const MALE_URL = process.env.NEXT_PUBLIC_WHOP_MALE_URL || "";
const FEMALE_URL = process.env.NEXT_PUBLIC_WHOP_FEMALE_URL || "";

export default function LandingPage() {
  const router = useRouter();
  const [gender, setGender] = useState<"male" | "female">("female");

  const handleRedirect = () => {
    // Redirect directly to main page with gender parameter
    router.push(`/?gender=${gender}`);
  };

  const femaleContent = {
    scrollStopper: "💖 Women are leveling up together — don't watch, join in.",
    banner: "💫 FOUNDING CIRCLE ACCESS — 500 Lifetime Spots Only",
    headline: "👑 Step Into Her Lane Before It Goes Private",
    subheadline:
      "A private space where women turn ambition into independence and inspiration into income.",
    body: "Your AI-powered hub for lifestyle, wellness, finance, travel, and micro-hustles — curated daily to elevate every part of your life.",
    benefits: [
      {
        icon: "💅",
        title: "Beauty & Lifestyle Lane",
        desc: "exclusive drops, deals & fashion finds",
      },
      {
        icon: "💰",
        title: "Micro-Hustle & Finance Lane",
        desc: "earn smarter, invest easier (stocks, crypto, real estate)",
      },
      {
        icon: "🌍",
        title: "Travel & Health Lane",
        desc: "curated trips & wellness hacks",
      },
      {
        icon: "🎁",
        title: "Holiday Lane",
        desc: "end-of-year flips & gifting goldmines",
      },
      {
        icon: "🧠",
        title: "Biohacking & Longevity Lane",
        desc: "maximize energy, fitness & mental wellness",
      },
    ],
    additionalText:
      "⚡ Each lane drops daily prompts, strategies, and offers designed to help you level up — with women on the same path.",
    pricing: "🔐 Pre-Launch Reward",
    pricingMain: "Lifetime Founding Access → $29.99 one-time",
    pricingAfter: "After launch → $59.99/month or $9.99/wk per lane",
    cta: "✨ Claim My Founding Access →",
    ctaSubtext: "(Only 500 Total Spots)",
    urgency: "⚡ Once 500 are in, Her Lane goes invite-only.",
    urgencySub: "Access unlocks automatically when lanes go live.",
    bonus:
      "✅ Founding Members get early-lane access links before public launch.",
  };

  const maleContent = {
    scrollStopper:
      "⚔️ The men who move quiet are winning loud — join the network.",
    banner: "⚔️ FOUNDING OPERATOR ACCESS — 500 Lifetime Entries Only",
    headline: "🔥 Enter Prime Lane Before It Goes Private",
    subheadline:
      "The network for men who trade distractions for dominance — built for those who move in silence but win loud.",
    body: "Prime Lane is your AI-powered edge for performance, money, and mastery — curated daily for the modern operator.",
    benefits: [
      {
        icon: "💸",
        title: "Hustle & Income Lane",
        desc: "daily cashflow plays & earning tactics",
      },
      {
        icon: "📈",
        title: "Finance & Investing Lane",
        desc: "actionable market insights (stocks, crypto, real estate)",
      },
      {
        icon: "⚙️",
        title: "Lifestyle & Gear Lane",
        desc: "tools, tech, and top-tier product drops",
      },
      {
        icon: "🧠",
        title: "Biohacking & Fitness Lane",
        desc: "performance, recovery, and focus frameworks",
      },
      {
        icon: "🎁",
        title: "Holiday Lane",
        desc: "seasonal profit plays and market flips",
      },
    ],
    additionalText:
      "💡 Each lane is designed to sharpen your execution, stack your income, and connect you with other high-intent men on the same grind.",
    pricing: "💪 Pre-Launch Reward",
    pricingMain: "Lifetime Founding Access → $39.99 one-time",
    pricingAfter: "After launch → $79.99/month or $14.99/wk per lane",
    cta: "💥 Join Now →",
    ctaSubtext: "(Only 500 Total Spots)",
    urgency: "⏳ Once 500 are in, Prime Lane goes invite-only.",
    urgencySub: "Access activates automatically when lanes go live.",
    bonus:
      "✅ Founding Operators receive early access to the full network before the public launch window.",
  };

  const content = gender === "male" ? maleContent : femaleContent;
  const primaryColor = gender === "male" ? "#255DF6" : "#E7B8A5";
  const textColor = gender === "male" ? "#FFFFFF" : "#2F3439";
  const accentColor = gender === "male" ? "#1A1F36" : "#F9D9E3";

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: gender === "male" ? "#0F0F23" : "#1A0B0B",
        backgroundImage:
          gender === "male"
            ? "radial-gradient(circle at 20% 80%, rgba(37, 93, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(37, 93, 246, 0.05) 0%, transparent 50%)"
            : "radial-gradient(circle at 20% 80%, rgba(231, 184, 165, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(231, 184, 165, 0.05) 0%, transparent 50%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 rounded-full opacity-15 animate-pulse"
          style={{ backgroundColor: primaryColor, animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full opacity-25 animate-pulse"
          style={{ backgroundColor: primaryColor, animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Premium Gender Toggle */}
        <div className="flex justify-center mb-8 sm:mb-16">
          <div className="relative bg-black/20 backdrop-blur-xl rounded-2xl p-1 sm:p-2 border border-white/10 shadow-2xl flex">
            <div
              className="absolute top-1 bottom-1 sm:top-2 sm:bottom-2 w-1/2 rounded-xl transition-all duration-500 ease-out"
              style={{
                backgroundColor: gender === "female" ? "#E7B8A5" : "#255DF6",
                left: gender === "female" ? "4px" : "calc(50% + 2px)",
                boxShadow: `0 8px 32px ${
                  gender === "female"
                    ? "rgba(231, 184, 165, 0.4)"
                    : "rgba(37, 93, 246, 0.4)"
                }`,
              }}
            />
            <button
              onClick={() => setGender("female")}
              className="relative z-10 px-6 sm:px-12 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300"
              style={{
                color: gender === "female" ? "#2F3439" : "#FFFFFF",
              }}
            >
              Female
            </button>
            <button
              onClick={() => setGender("male")}
              className="relative z-10 px-6 sm:px-12 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300"
              style={{
                color: gender === "male" ? "#FFFFFF" : "#FFFFFF",
              }}
            >
              Male
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-20">
          {/* Scroll Stopper */}
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 backdrop-blur-xl bg-white/10 border border-white/20">
            <span className="text-sm sm:text-lg font-semibold text-white">
              {content.scrollStopper}
            </span>
          </div>

          {/* Banner */}
          <div
            className="inline-block px-4 sm:px-8 py-3 sm:py-4 rounded-2xl mb-6 sm:mb-8 shadow-2xl"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 20px 40px ${primaryColor}40`,
            }}
          >
            <h3 className="text-sm sm:text-xl font-bold text-white tracking-wide">
              {content.banner}
            </h3>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight tracking-tight">
            {content.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed font-light px-4">
            {content.subheadline}
          </p>

          {/* Body Text */}
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light px-4">
            {content.body}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 sm:mb-16 text-center px-4">
            {gender === "male" ? "🚀" : "🌸"} Inside{" "}
            {gender === "male" ? "Prime Lane" : "Her Lane"}, You'll Unlock:
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
            {content.benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  boxShadow: `0 20px 40px ${primaryColor}20`,
                }}
              >
                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="text-3xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-white/90 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed group-hover:text-white/80 transition-colors">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center px-4">
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
              {content.additionalText}
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-12 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 sm:mb-12 px-4">
            {content.pricing}
          </h3>

          <div className="relative max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-xl opacity-30"
              style={{ backgroundColor: primaryColor }}
            ></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-white/20 shadow-2xl">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
                {content.pricingMain}
              </div>
              <div className="text-lg sm:text-xl md:text-2xl text-white/80 font-light">
                {content.pricingAfter}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="max-w-lg mx-auto px-4">
            <button
              onClick={handleRedirect}
              className="w-full h-12 sm:h-14 md:h-16 rounded-2xl font-black text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: primaryColor,
                color: textColor,
                boxShadow: `0 20px 40px ${primaryColor}40`,
              }}
            >
              {content.cta}
            </button>

            <p className="text-white/60 mt-4 sm:mt-6 text-sm sm:text-lg font-medium text-center">
              {content.ctaSubtext}
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center">
          <div className="inline-block px-4 sm:px-8 py-4 sm:py-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/20 mb-8 mx-4">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">
              {content.urgency}
            </p>
            <p className="text-white/70 text-sm sm:text-base md:text-lg mb-4">
              {content.urgencySub}
            </p>
            <p className="text-white/60 font-medium text-xs sm:text-sm">
              {content.bonus}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
