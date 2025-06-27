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
  Code,
  Copy,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  
  // TODO: Replace with actual token address
  const tokenAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

  const handleCopyTokenAddress = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full overflow-hidden">
      <Button variant="outline" className="absolute top-10 right-10">Launch App</Button>
      
      <div className="flex flex-col items-center space-y-6">
        <video src="/images/landing/Green_Helmet.mp4" autoPlay loop muted className="w-150 h-150"/>
        
        {/* Token Account Copy Button */}
        <div className="flex flex-col items-center space-y-3">
          <Text variant="secondary" size="sm" className="text-text-tertiary">
            Token Contract Address
          </Text>
          <div className="flex items-center space-x-3 p-4 bg-surface-elevated/50 rounded-xl border border-surface-tertiary/30 backdrop-blur-sm">
            <code className="text-sm font-mono text-text-primary max-w-xs truncate">
              {tokenAddress}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyTokenAddress}
              className="flex items-center space-x-2 text-highlight hover:text-primary transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}