"use client";

import { useState, useEffect } from "react";
import { Card, Container, Text } from "@/components/ui";
import { ApiService } from "@/lib/ApiService";

export default function DashboardPage() {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        // Fetch multiple random videos
        
        const responses = await ApiService.getInstance().getRandomVideo();
        console.log("API responses:", responses);
        
        // Extract video URLs from responses
        const urls = responses.map((response: any) => {
          // Handle different possible response formats
          if (typeof response === 'string') {
            return response;
          } else if (response?.url) {
            return response.url;
          } else if (response?.videoUrl) {
            return response.videoUrl;
          } else if (response?.data?.url) {
            return response.data.url;
          } else {
            console.warn("Unexpected response format:", response);
            return "/images/landing/Green_Helmet.mp4"; // fallback
          }
        });

        setVideoUrls(urls);
      } catch (error) {
        console.error("Error fetching videos:", error);
        // Fallback to demo videos
        setVideoUrls(
          Array.from({ length: 5 }, () => "/images/landing/Green_Helmet.mp4")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  console.log(videoUrls)

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <Text className="text-primary font-mono">Loading Videos...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col relative">
      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving fog clouds with cyber glow */}
        <div
          className="absolute top-1/6 left-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse opacity-70"
          style={{ animation: "fogFloat1 20s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-highlight/20 rounded-full blur-3xl animate-pulse opacity-60"
          style={{ animation: "fogFloat2 25s ease-in-out infinite reverse" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-50"
          style={{ animation: "fogFloat3 18s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/6 w-72 h-72 bg-highlight/12 rounded-full blur-3xl animate-pulse opacity-80"
          style={{ animation: "fogFloat4 22s ease-in-out infinite reverse" }}
        ></div>

        {/* Floating magical particles */}
        <div
          className="absolute top-1/5 left-1/6 w-2 h-2 bg-primary rounded-full shadow-glow animate-ping opacity-80"
          style={{ animation: "particleDrift1 12s linear infinite" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-highlight rounded-full shadow-glow-cyan animate-ping opacity-70"
          style={{ animation: "particleDrift2 15s linear infinite" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-primary rounded-full shadow-glow animate-ping opacity-90"
          style={{ animation: "particleDrift3 10s linear infinite" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/6 w-2.5 h-2.5 bg-highlight rounded-full shadow-glow-cyan animate-ping opacity-60"
          style={{ animation: "particleDrift4 18s linear infinite" }}
        ></div>
        <div
          className="absolute bottom-1/5 left-1/4 w-1.5 h-1.5 bg-primary rounded-full shadow-glow animate-ping opacity-75"
          style={{ animation: "particleDrift5 14s linear infinite" }}
        ></div>

        {/* Mysterious gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-highlight/8 opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/3 to-transparent opacity-60"></div>
        
        {/* Subtle cyber grid pattern in the far background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.3) 0.5px, transparent 0.5px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.2) 0.5px, transparent 0.5px)
            `,
            backgroundSize: "100px 100px",
            animation: "gridPulse 8s ease-in-out infinite"
          }}
        ></div>
      </div>

      {/* Video Grid Layout */}
      <div className="flex-1 bg-transparent p-4 overflow-hidden relative z-10">
        <div className="h-full max-w-4xl mx-auto">
          {/* Custom Grid Layout */}
          <div className="h-full grid grid-cols-3 grid-rows-3 gap-4">
            {/* Top Row - Two small cards on left, one tall card on right */}
            <Card className="border-1 col-span-1 row-span-1 overflow-hidden">
              <video
                src={videoUrls[0]}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            <Card className="border-1 col-span-1 row-span-1 overflow-hidden">
              <video
                src={videoUrls[1]}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            <Card className="border-1 col-span-1 row-span-2 overflow-hidden">
              <video
                src={videoUrls[2]}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            {/* Middle Row - Wide card spanning two columns */}
            <Card className="border-1 col-span-2 row-span-1 overflow-hidden">
              <video
                src={videoUrls[3]}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            {/* Bottom Row - Two cards side by side */}
            <Card className="border-1 col-span-1 row-span-1 overflow-hidden">
              <video
                src={videoUrls[4]}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            <Card className="border-1 col-span-2 row-span-1 overflow-hidden">
              <video
                src={videoUrls[0]} // Reuse first video for the 6th slot
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>
          </div>
        </div>
      </div>

      {/* CSS Animations for Atmospheric Effects */}
      <style jsx>{`
        @keyframes fogFloat1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          33% {
            transform: translate(100px, -50px) scale(1.2);
            opacity: 0.5;
          }
          66% {
            transform: translate(-80px, 30px) scale(0.9);
            opacity: 0.8;
          }
        }

        @keyframes fogFloat2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-120px, -70px) scale(1.3);
            opacity: 0.4;
          }
        }

        @keyframes fogFloat3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          25% {
            transform: translate(60px, 40px) scale(1.1);
            opacity: 0.7;
          }
          75% {
            transform: translate(-90px, -20px) scale(0.8);
            opacity: 0.3;
          }
        }

        @keyframes fogFloat4 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          40% {
            transform: translate(70px, -60px) scale(1.2);
            opacity: 0.4;
          }
          80% {
            transform: translate(-40px, 20px) scale(0.9);
            opacity: 0.6;
          }
        }

        @keyframes particleDrift1 {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translate(300px, -200px) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes particleDrift2 {
          0% {
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          85% {
            opacity: 0.7;
          }
          100% {
            transform: translate(-250px, -300px) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes particleDrift3 {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.9;
          }
          100% {
            transform: translate(200px, -150px) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes particleDrift4 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          12% {
            opacity: 0.6;
          }
          88% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-180px, -250px) scale(0.4);
            opacity: 0;
          }
        }

        @keyframes particleDrift5 {
          0% {
            transform: translate(0, 0) scale(0.7);
            opacity: 0;
          }
          18% {
            opacity: 0.75;
          }
          82% {
            opacity: 0.75;
          }
          100% {
            transform: translate(150px, -180px) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
