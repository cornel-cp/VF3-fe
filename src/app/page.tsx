'use client';

import { useState, useEffect } from 'react';
import { 
  Button, 
  Text, 
} from '@/components/ui';
import { 
  Copy,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // TODO: Replace with actual token address
  const tokenAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

  useEffect(() => {
    // Animate progress from 0 to 100
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const increment = (100 / duration) * interval;
    
    const timer = setInterval(() => {
      setProgress(prev => {
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

  const handleCopyTokenAddress = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Cyber Loading Screen
  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center w-full overflow-hidden bg-black relative">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        
        {/* Loading Content */}
        <div className="relative z-10 flex flex-col items-center space-y-8 font-cyber">                    
          {/* Cyber Progress Bar */}
          <div className="w-80 sm:w-96 md:w-[32rem] space-y-2">
            <div className="flex justify-between text-xs font-mono text-text-tertiary">
              <span>[LOAD]</span>
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
              {/* Grid overlay */}
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: '10px 100%'
              }}></div>
            </div>
          </div>
          
          {/* Status Text */}
          <div className="text-center">
            <div className="text-highlight text-xs sm:text-sm font-mono">
              {progress < 30 ? '>> LOADING ASSETS...' : 
               progress < 60 ? '>> ESTABLISHING CONNECTION...' :
               progress < 90 ? '>> SYNCING PROTOCOLS...' :
               '>> READY FOR DEPLOYMENT'}
            </div>
          </div>
          
          {/* Cyber loading dots */}
          <div className="flex space-x-3">
            <div className="w-2 h-2 bg-primary rounded-none shadow-glow animate-bounce"></div>
            <div className="w-2 h-2 bg-highlight rounded-none shadow-glow-cyan animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-primary rounded-none shadow-glow animate-bounce delay-400"></div>
          </div>
        </div>
      </div>
    );
  }

  // Main Content (after loading)
  return (
    <div className="relative flex flex-col h-screen items-center justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Green Fog Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving fog clouds */}
        <div className="absolute top-1/6 md:top-1/4 left-0 w-32 h-32 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-60" 
             style={{ animation: 'float-left 15s ease-in-out infinite' }}></div>
        <div className="absolute bottom-0 md:bottom-1/4 right-0 w-20 h-20 md:w-80 md:h-80 bg-primary/40 rounded-full blur-3xl animate-pulse opacity-50" 
             style={{ animation: 'float-right 18s ease-in-out infinite reverse' }}></div>
        <div className="absolute top-2/3 left-1/6 w-32 h-32 md:w-64 md:h-64 bg-highlight/20 rounded-full blur-2xl animate-pulse opacity-40" 
             style={{ animation: 'float-up 12s ease-in-out infinite' }}></div>
        <div className="absolute bottom-full right-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-70" 
             style={{ animation: 'float-down 20s ease-in-out infinite' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/5 left-1/6 w-1 h-1 bg-primary/80 rounded-full animate-ping" 
             style={{ animation: 'drift-1 8s linear infinite' }}></div>
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-highlight/60 rounded-full animate-ping" 
             style={{ animation: 'drift-2 10s linear infinite' }}></div>
        <div className="absolute bottom-1/5 left-2/3 w-1 h-1 bg-primary/70 rounded-full animate-ping" 
             style={{ animation: 'drift-3 12s linear infinite' }}></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-highlight/2 opacity-30"></div>
      </div>

      <Button 
        variant="outline" 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 text-xs sm:text-sm z-20" 
        onClick={() => {
          window.location.href = 'https://app.promptclash.fun';
        }}
      >
        Launch App
      </Button>
       
      <div className="relative flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-lg z-10">
        <video 
          src="/images/landing/Green_Helmet.mp4" 
          autoPlay 
          loop 
          muted 
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-150 xl:h-150 relative z-10"
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
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-left {
          0%, 100% { transform: translateX(-100px) translateY(0px); }
          50% { transform: translateX(100px) translateY(-50px); }
        }
        @keyframes float-right {
          0%, 100% { transform: translateX(100px) translateY(20px); }
          50% { transform: translateX(-80px) translateY(-30px); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-40px) translateX(30px); }
          66% { transform: translateY(-20px) translateX(-20px); }
        }
        @keyframes float-down {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(60px) translateX(40px); }
        }
        @keyframes drift-1 {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(200px, -100px) scale(1); opacity: 0; }
        }
        @keyframes drift-2 {
          0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(-150px, -200px) scale(0.3); opacity: 0; }
        }
        @keyframes drift-3 {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(100px, -150px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}