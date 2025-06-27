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
    <div className="flex flex-col h-screen items-center justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
      <Button 
        variant="outline" 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 text-xs sm:text-sm" 
        onClick={() => {
          window.location.href = 'https://app.promptclash.fun';
        }}
      >
        Launch App
      </Button>
       
      <div className="flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-lg">
        <video 
          src="/images/landing/Green_Helmet.mp4" 
          autoPlay 
          loop 
          muted 
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-150 xl:h-150"
        />
         
        {/* Token Account Copy Button */}
        <div className="flex flex-col items-center space-y-3 w-full">
          <Text variant="secondary" size="sm" className="text-text-tertiary text-center">
            Token Contract Address
          </Text>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 bg-surface-elevated/50 rounded-xl border border-surface-tertiary/30 backdrop-blur-sm w-full max-w-md">
            <code className="text-xs sm:text-sm font-mono text-text-primary truncate w-full sm:w-auto text-center sm:text-left">
              {tokenAddress}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyTokenAddress}
              className="flex items-center space-x-2 text-highlight hover:text-primary transition-colors w-full sm:w-auto justify-center shrink-0"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-xs sm:text-sm text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Copy</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}