'use client';

import { useState } from 'react';
import { 
  Card, 
  Button, 
  ProgressBar, 
  Heading, 
  Text, 
  Badge, 
  Input, 
  Avatar, 
  Container 
} from '@/components/ui';
import { 
  Bell, 
  Settings, 
  Search, 
  Plus, 
  Heart,
  TrendingUp,
  Users,
  Activity,
  Zap,
  Terminal,
  Code
} from 'lucide-react';

export default function HomePage() {

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
      <video 
        src="/images/landing/Green_Helmet.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-100 h-100 object-cover"
      />
    </div>
  );
}