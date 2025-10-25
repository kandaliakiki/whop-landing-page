"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrimeLanePage() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const handleRedirect = () => {
    // Redirect directly to main page with lane parameter
    router.push(`/?lane=primelane`);
  };

  // Handle scroll to show sticky CTA after pricing section
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after user scrolls past the pricing section
      const pricingSection = document.querySelector("[data-pricing-section]");
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        setShowStickyCTA(rect.bottom < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const content = {
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
        desc: "Daily cashflow plays & earning tactics",
      },
      {
        icon: "📈",
        title: "Finance & Investing Lane",
        desc: "Actionable market insights (stocks, crypto, real estate)",
      },
      {
        icon: "🏈",
        title: "Sports Bets Lane",
        desc: "Daily action plays, insider strategies, and high-probability wins",
      },
      {
        icon: "⚙️",
        title: "Lifestyle & Gear Lane",
        desc: "Tools, tech, and top-tier product drops",
      },
      {
        icon: "🧠",
        title: "Biohacking & Fitness Lane",
        desc: "Performance, recovery, and focus frameworks",
      },
      {
        icon: "🎁",
        title: "Holiday Lane",
        desc: "Seasonal profit plays and market flips",
      },
    ],
    additionalText:
      "💡 Each lane is designed to sharpen your execution, stack your income, and connect you with other high-intent men on the same grind.",
    pricing: "💪 Pre-Launch Reward",
    pricingMain: "Founding Access → $39.99/month",
    pricingAfter: "After launch → $79.99/month or $14.99/wk per lane",
    cta: "💥 Join Now →",
    ctaSubtext: "(Only 500 Total Spots)",
    urgency: "⏳ Once 500 are in, Prime Lane goes invite-only.",
    urgencySub: "Access activates automatically when lanes go live.",
    bonus:
      "✅ Founding Operators receive early access to the full network before the public launch window.",
  };

  const primaryColor = "#255DF6";
  const textColor = "#FFFFFF";
  const accentColor = "#1A1F36";

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: "#0F0F23",
        backgroundImage:
          "radial-gradient(circle at 20% 80%, rgba(37, 93, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(37, 93, 246, 0.05) 0%, transparent 50%)",
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

          {/* Above the Fold CTA */}
          <div className="mt-8 sm:mt-12">
            <button
              onClick={handleRedirect}
              className="w-full max-w-md mx-auto h-14 sm:h-16 rounded-2xl font-black text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl block"
              style={{
                backgroundColor: primaryColor,
                color: textColor,
                boxShadow: `0 20px 40px ${primaryColor}40`,
              }}
            >
              💪 Secure Operator Access
            </button>
            <p className="text-white/60 mt-3 text-sm sm:text-base font-medium text-center">
              Founding Circle — 500 Lifetime Entries.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 sm:mb-16 text-center px-4">
            🚀 Inside Prime Lane, You'll Unlock:
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

          {/* Mid-Scroll CTA */}
          <div className="mt-8 sm:mt-12">
            <button
              onClick={handleRedirect}
              className="w-full max-w-md mx-auto h-14 sm:h-16 rounded-2xl font-black text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl block"
              style={{
                backgroundColor: primaryColor,
                color: textColor,
                boxShadow: `0 20px 40px ${primaryColor}40`,
              }}
            >
              ⚡ Join Prime Lane Before Launch Closes
            </button>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-12 sm:mb-20" data-pricing-section>
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
        </div>

        {/* Footer Section */}
        <div className="text-center pb-12">
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

      {/* Sticky CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 transition-all duration-500 ease-out ${
          showStickyCTA
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleRedirect}
            className="w-full h-14 sm:h-16 rounded-2xl font-black text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: primaryColor,
              color: textColor,
              boxShadow: `0 20px 40px ${primaryColor}40`,
            }}
          >
            🔥 I'm In — Enter Prime Lane
          </button>
        </div>
      </div>
    </main>
  );
}
