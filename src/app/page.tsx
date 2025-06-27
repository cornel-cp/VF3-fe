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
    <div className="sticky top-0 flex h-[calc(100vh-100px)] items-center justify-center overflow-hidden">
      <video src="/images/landing/Green_Helmet.mp4" autoPlay loop muted  className="w-100 h-100"/>
    </div>
  );
}