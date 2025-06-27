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
        const response = await ApiService.getInstance().getRandomVideo();

        // Assuming the API returns an array of video URLs or an object with video URLs
        const urls = Array.isArray(response) ? response : response.videos || [];

        // We need exactly 5 videos for the layout
        const fallbackUrls = Array.from(
          { length: 5 },
          () => "/images/landing/Green_Helmet.mp4"
        );
        const finalUrls =
          urls.length >= 5
            ? urls.slice(0, 5)
            : [...urls, ...fallbackUrls.slice(urls.length)];

        setVideoUrls(finalUrls);
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
      {/* Green Header */}
      <div className="bg-primary h-12 w-full flex-shrink-0"></div>

      {/* Video Grid Layout */}
      <div className="flex-1 bg-black p-4 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto">
          {/* Custom Grid Layout */}
          <div className="h-full grid grid-cols-3 grid-rows-3 gap-4">
            {/* Top Row - Two small cards on left, one tall card on right */}
            <Card className="bg-blue-600 border-none col-span-1 row-span-1 overflow-hidden">
              <video
                src={videoUrls[0]}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            <Card className="bg-blue-600 border-none col-span-1 row-span-1 overflow-hidden">
              <video
                src={videoUrls[1]}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            <Card className="bg-blue-600 border-none col-span-1 row-span-2 overflow-hidden">
              <video
                src={videoUrls[2]}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            {/* Middle Row - Wide card spanning two columns */}
            <Card className="bg-blue-600 border-none col-span-2 row-span-1 overflow-hidden">
              <video
                src={videoUrls[3]}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            {/* Bottom Row - Two cards side by side */}
            <Card className="bg-blue-600 border-none col-span-1 row-span-1 overflow-hidden">
              <video
                src={videoUrls[4]}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                preload="metadata"
                playsInline
              />
            </Card>

            <Card className="bg-blue-600 border-none col-span-1 row-span-1 overflow-hidden">
              <video
                src={videoUrls[0]} // Reuse first video for the 6th slot
                className="w-full h-full object-cover"
                controls
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
