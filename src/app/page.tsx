"use client";

import { useState, useEffect } from "react";
import { Button, Text } from "@/components/ui";
import { Copy, CheckCircle } from "lucide-react";

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // TODO: Replace with actual token address
  const tokenAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

  // Slideshow data
  const slides = [
    {
      title: "AI-Powered Battle Arena",
      description: "Create unique characters and watch them battle in AI-generated combat videos",
      icon: "⚔️"
    },
    {
      title: "Crypto Betting",
      description: "Secure, transparent wagering on Solana blockchain with instant payouts",
      icon: "🪙"
    },
    {
      title: "Dynamic Video Generation",
      description: "Advanced AI creates unique battle sequences for every match",
      icon: "🎬"
    },
    {
      title: "Community Driven",
      description: "Join a growing community of creators and strategists",
      icon: "🌟"
    }
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // Small delay before hiding loading
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(slideTimer);
  }, [slides.length]);

  const handleCopyTokenAddress = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Cyber Loading Screen
  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center w-full overflow-hidden bg-black relative">
        {/* Loading Content */}
        <div className="relative z-10 flex flex-col items-center space-y-8 font-cyber">
          {/* Cyber Progress Bar */}
          <div className="w-80 sm:w-96 md:w-[32rem] space-y-2">
            <div className="flex justify-between text-xs font-mono text-text-tertiary">
              <span>[LOADING]</span>
              <span>[{Math.floor(progress)}/100]</span>
            </div>
            <div className="relative h-4 bg-surface-primary border border-primary/30 rounded-none">
              {/* Main progress bar */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-highlight shadow-glow transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
              {/* Scanning line effect */}
              <div
                className="absolute top-0 h-full w-1 bg-highlight shadow-glow-cyan animate-pulse"
                style={{ left: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Status Text */}
          <div className="text-center">
            <div className="text-highlight text-xs sm:text-sm font-mono">
              {progress < 30
                ? ">> LOADING ASSETS..."
                : progress < 60
                ? ">> ESTABLISHING CONNECTION..."
                : progress < 90
                ? ">> SYNCING PROTOCOLS..."
                : ">> READY FOR DEPLOYMENT"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Content (after loading)
  return (
    <div className="relative flex flex-col h-screen items-center justify-center w-full overflow-hidden bg-black">
      {/* Video Background Layer */}
      <video
        src="/images/landing/Green_Helmet2.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Animated Green Fog Background - Upper Layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Moving fog clouds */}
        <div
          className="absolute top-1/6 md:top-1/4 left-0 w-32 h-32 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-60"
          style={{ animation: "float-left 15s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-0 md:bottom-1/4 right-0 w-20 h-20 md:w-80 md:h-80 bg-primary/40 rounded-full blur-3xl animate-pulse opacity-50"
          style={{ animation: "float-right 18s ease-in-out infinite reverse" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/6 w-32 h-32 md:w-64 md:h-64 bg-highlight/20 rounded-full blur-2xl animate-pulse opacity-40"
          style={{ animation: "float-up 12s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-full right-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-70"
          style={{ animation: "float-down 20s ease-in-out infinite" }}
        ></div>

        {/* Floating particles */}
        <div
          className="absolute top-1/5 left-1/6 w-1 h-1 bg-primary/80 rounded-full animate-ping"
          style={{ animation: "drift-1 8s linear infinite" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-highlight/60 rounded-full animate-ping"
          style={{ animation: "drift-2 10s linear infinite" }}
        ></div>
        <div
          className="absolute bottom-1/5 left-2/3 w-1 h-1 bg-primary/70 rounded-full animate-ping"
          style={{ animation: "drift-3 12s linear infinite" }}
        ></div>


      </div>

      {/* Launch App Button - Top Right */}
      <Button
        variant="outline"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 text-xs sm:text-sm z-20"
        onClick={() => {
          window.location.href = "https://app.promptclash.fun";
        }}
      >
        Launch App
      </Button>

      {/* Information Slideshow - Below Center */}
      <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md px-4">
        <div className="">
          {/* Slide Content */}
          <div className="space-y-3">
            <Text className="text-lg font-semibold text-primary font-mono text-center">
              {slides[currentSlide].title}
            </Text>
            <Text className="text-sm text-text-secondary leading-relaxed text-center">
              {slides[currentSlide].description}
            </Text>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary shadow-glow'
                    : 'bg-surface-tertiary/50 hover:bg-surface-tertiary'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Right Controls */}
      <div className="absolute bottom-2 right-4 flex items-center space-x-3 z-20">
        

        {/* Token Contract Icon */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyTokenAddress}
          className="w-10 h-10 p-0 bg-surface-elevated/50 backdrop-blur-sm border border-surface-tertiary/30 hover:border-primary/50 text-text-primary hover:text-primary transition-colors relative group"
        >
          {copied ? (
            <CheckCircle className="w-6 h-6 text-green-400" />
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Token/Coin Icon - Hexagon with currency symbol */}
              <path d="M12 2L21.5 7v10L12 22L2.5 17V7L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M10 10.5h2v-1h-2v1zm0 3h2v-1h-2v1zm4-3h-2v1h2v-1zm0 3h-2v1h2v-1z" fill="currentColor"/>
              <rect x="9" y="8.5" width="6" height="7" stroke="currentColor" strokeWidth="1" fill="none" rx="1"/>
            </svg>
          )}
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-surface-elevated/90 backdrop-blur-sm text-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-surface-tertiary/30">
            {copied ? "Copied!" : "Copy Token Address"}
          </div>
        </Button>

        {/* X (Twitter) Link */}
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0 bg-surface-elevated/50 backdrop-blur-sm border border-surface-tertiary/30 hover:border-primary/50 text-text-primary hover:text-primary transition-colors"
          onClick={() => {
            window.open("https://twitter.com/promptclash", "_blank");
          }}
        >
          <svg
            className="w-10 h-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Button>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-left {
          0%,
          100% {
            transform: translateX(-100px) translateY(0px);
          }
          50% {
            transform: translateX(100px) translateY(-50px);
          }
        }
        @keyframes float-right {
          0%,
          100% {
            transform: translateX(100px) translateY(20px);
          }
          50% {
            transform: translateX(-80px) translateY(-30px);
          }
        }
        @keyframes float-up {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-40px) translateX(30px);
          }
          66% {
            transform: translateY(-20px) translateX(-20px);
          }
        }
        @keyframes float-down {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(60px) translateX(40px);
          }
        }
        @keyframes drift-1 {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(200px, -100px) scale(1);
            opacity: 0;
          }
        }
        @keyframes drift-2 {
          0% {
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translate(-150px, -200px) scale(0.3);
            opacity: 0;
          }
        }
        @keyframes drift-3 {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate(100px, -150px) scale(1.2);
            opacity: 0;
          }
        }
        @keyframes slideProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
