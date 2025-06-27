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
    <div className="h-screen bg-black overflow-hidden flex flex-col">

      {/* Video Grid Layout */}
      <div className="flex-1 bg-black p-4 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto">
          {/* Custom Grid Layout */}
          <div className="h-full grid grid-cols-3 grid-rows-3 gap-4">
            {/* Top Row - Two small cards on left, one tall card on right */}
            <Card className="border-1 col-span-1 row-span-1 overflow-hidden">
              <video
                src={videoUrls[0]}
                className="w-full h-full object-cover"
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
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
