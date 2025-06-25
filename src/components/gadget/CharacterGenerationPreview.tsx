import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Star, Eye } from 'lucide-react';

const MagicalLoadingPreview = () => {
  const [loadingText, setLoadingText] = useState('Generating your character...');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const textCycle = [
      'Weaving magical essence...',
      'Channeling AI powers...',
      'Crafting your warrior...',
      'Infusing battle spirit...',
      'Generating your character...',
      'Breathing life into creation...',
      'Awakening ancient powers...',
      'Forging legendary abilities...'
    ];

    const textInterval = setInterval(() => {
      setLoadingText(textCycle[Math.floor(Math.random() * textCycle.length)]);
    }, 2000);

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="magical-preview">
      {/* Foggy Background */}
      <div className="fog-container">
        <div className="fog fog-1"></div>
        <div className="fog fog-2"></div>
        <div className="fog fog-3"></div>
        <div className="fog fog-4"></div>
        <div className="fog fog-5"></div>
        <div className="fog fog-6"></div>
      </div>

      {/* Magical Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="magical-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <Sparkles size={8} />
          </div>
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="orbs-container">
        {[...Array(12)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="magical-orb"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Background Energy Lines */}
      <div className="energy-lines">
        {[...Array(8)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="energy-line"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          ></div>
        ))}
      </div>

      {/* Mystical Symbols Floating */}
      <div className="floating-symbols">
        {['◊', '◈', '◇', '◆', '▲', '▼', '◢', '◣', '⬟', '⬢', '⬡', '⟐'].map((symbol, i) => (
          <div
            key={`symbol-${i}`}
            className="floating-symbol"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              fontSize: `${12 + Math.random() * 8}px`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Corner Effects */}
      <div className="corner-effects">
        <div className="corner-glow top-left"></div>
        <div className="corner-glow top-right"></div>
        <div className="corner-glow bottom-left"></div>
        <div className="corner-glow bottom-right"></div>
      </div>

      {/* Top Spacer */}
      <div style={{ flex: 1, minHeight: '20px' }}></div>

      {/* Central Magic Circle */}
      <div className="magic-circle-container">
        <div className="magic-circle outer-ring">
          <div className="rune rune-1">
            <Star size={16} />
          </div>
          <div className="rune rune-2">
            <Zap size={16} />
          </div>
          <div className="rune rune-3">
            <Eye size={16} />
          </div>
          <div className="rune rune-4">
            <Sparkles size={16} />
          </div>
        </div>
        
        <div className="magic-circle middle-ring"></div>
        
        <div className="magic-circle inner-ring">
          <div className="center-crystal">
            <div className="crystal-core"></div>
            <div className="crystal-glow"></div>
          </div>
        </div>
      </div>

      {/* Energy Waves */}
      <div className="energy-waves">
        <div className="energy-wave wave-1"></div>
        <div className="energy-wave wave-2"></div>
        <div className="energy-wave wave-3"></div>
      </div>

      {/* Bottom Spacer */}
      <div style={{ flex: 1, minHeight: '20px' }}></div>

      {/* Loading Text */}
      <div className="loading-text-container">
        <h3 className="loading-title">
          {loadingText}
          <span className="loading-dots">{dots}</span>
        </h3>
        <p className="loading-subtitle">
          This might take a few moments as we bring your character to life with magical AI powers! 
        </p>
        <div className="progress-indicator">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <span className="progress-text">Generating...</span>
        </div>
      </div>

      <style jsx>{`
        .magical-preview {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 400px;
          background: radial-gradient(ellipse at center, #0a1f0a 0%, #000000 70%);
          border: 2px solid #00ff00;
          border-radius: 15px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          box-shadow: 
            inset 0 0 30px rgba(0, 255, 0, 0.2),
            0 0 40px rgba(0, 255, 0, 0.3),
            0 0 80px rgba(0, 255, 0, 0.1);
        }

        /* Foggy Background Effects */
        .fog-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .fog {
          position: absolute;
          background: radial-gradient(ellipse, rgba(0, 255, 0, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          animation: fogFloat 8s ease-in-out infinite;
        }

        .fog-1 {
          width: 60%;
          height: 40%;
          top: -10%;
          left: -20%;
          animation-delay: 0s;
        }

        .fog-2 {
          width: 50%;
          height: 35%;
          top: 30%;
          right: -15%;
          animation-delay: -2s;
        }

        .fog-3 {
          width: 40%;
          height: 30%;
          bottom: -10%;
          left: 10%;
          animation-delay: -4s;
        }

        .fog-4 {
          width: 35%;
          height: 25%;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: -6s;
        }

        .fog-5 {
          width: 45%;
          height: 35%;
          bottom: 5%;
          right: 10%;
          animation-delay: -1s;
        }

        .fog-6 {
          width: 25%;
          height: 20%;
          top: 70%;
          left: 15%;
          animation-delay: -5s;
        }

        /* Magical Particles */
        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .magical-particle {
          position: absolute;
          color: #00ff88;
          animation: particleFloat 5s linear infinite;
          opacity: 0;
        }

        .magical-particle svg {
          filter: drop-shadow(0 0 8px #00ff88);
        }

        /* Floating Orbs */
        .orbs-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .magical-orb {
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, #00ff88 0%, #00ff00 50%, transparent 70%);
          border-radius: 50%;
          animation: orbFloat 6s ease-in-out infinite;
          box-shadow: 
            0 0 20px #00ff88,
            0 0 40px #00ff88,
            inset 0 0 10px rgba(255, 255, 255, 0.3);
        }

        /* Energy Lines */
        .energy-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .energy-line {
          position: absolute;
          width: 2px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 255, 136, 0.3) 20%,
            rgba(0, 255, 136, 0.6) 50%,
            rgba(0, 255, 136, 0.3) 80%,
            transparent 100%
          );
          animation: energyLineFlow 8s linear infinite;
          filter: blur(1px);
        }

        /* Corner Effects */
        .corner-effects {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .corner-glow {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%);
          filter: blur(20px);
          animation: cornerPulse 4s ease-in-out infinite;
        }

        .top-left {
          top: -50px;
          left: -50px;
          animation-delay: 0s;
        }

        .top-right {
          top: -50px;
          right: -50px;
          animation-delay: -1s;
        }

        .bottom-left {
          bottom: -50px;
          left: -50px;
          animation-delay: -2s;
        }

        .bottom-right {
          bottom: -50px;
          right: -50px;
          animation-delay: -3s;
        }

        /* Central Magic Circle */
        .magic-circle-container {
          position: relative;
          width: min(40%, 200px);
          height: min(40%, 200px);
          max-width: 200px;
          max-height: 200px;
          min-width: 120px;
          min-height: 120px;
          z-index: 10;
          flex-shrink: 0;
        }

        .magic-circle {
          position: absolute;
          border: 2px solid #00ff00;
          border-radius: 50%;
          animation: circleRotate 10s linear infinite;
        }

        .outer-ring {
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-style: dashed;
          box-shadow: 
            0 0 30px rgba(0, 255, 0, 0.5),
            inset 0 0 30px rgba(0, 255, 0, 0.2);
        }

        .middle-ring {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
          border-style: dotted;
          animation-direction: reverse;
          animation-duration: 8s;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
        }

        .inner-ring {
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
          border-style: solid;
          animation-duration: 6s;
          box-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
        }

        /* Runes on Outer Ring */
        .rune {
          position: absolute;
          color: #00ff88;
          animation: runeGlow 2s ease-in-out infinite alternate;
        }

        .rune-1 { top: -10px; left: 50%; transform: translateX(-50%); }
        .rune-2 { right: -10px; top: 50%; transform: translateY(-50%); }
        .rune-3 { bottom: -10px; left: 50%; transform: translateX(-50%); }
        .rune-4 { left: -10px; top: 50%; transform: translateY(-50%); }

        .rune svg {
          filter: drop-shadow(0 0 10px #00ff88);
        }

        /* Center Crystal */
        .center-crystal {
          position: relative;
          width: 50%;
          height: 50%;
          max-width: 40px;
          max-height: 40px;
          min-width: 20px;
          min-height: 20px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .crystal-core {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #00ff00, #00ff88, #88ff00);
          border-radius: 50%;
          animation: crystalPulse 2s ease-in-out infinite;
          box-shadow: 
            0 0 20px #00ff88,
            0 0 40px #00ff88,
            inset 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .crystal-glow {
          position: absolute;
          width: 120%;
          height: 120%;
          top: -10%;
          left: -10%;
          background: radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: glowPulse 3s ease-in-out infinite;
        }

        /* Energy Waves */
        .energy-waves {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(60%, 300px);
          height: min(60%, 300px);
          max-width: 300px;
          max-height: 300px;
          min-width: 180px;
          min-height: 180px;
        }

        .energy-wave {
          position: absolute;
          border: 1px solid rgba(0, 255, 0, 0.3);
          border-radius: 50%;
          animation: waveExpand 4s ease-out infinite;
        }

        .wave-1 {
          width: 33%;
          height: 33%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 0s;
        }

        .wave-2 {
          width: 33%;
          height: 33%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 1.3s;
        }

        .wave-3 {
          width: 33%;
          height: 33%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 2.6s;
        }

        /* Loading Text */
        .loading-text-container {
          position: relative;
          text-align: center;
          z-index: 20;
          width: 90%;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          margin-top: auto;
          padding: 20px 0;
        }

        .loading-title {
          font-size: clamp(1rem, 4vw, 1.5rem);
          font-weight: bold;
          color: #00ff00;
          text-shadow: 
            0 0 10px #00ff00,
            0 0 20px #00ff00;
          margin-bottom: 0.5rem;
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .loading-dots {
          color: #00ff88;
          font-size: 1.2em;
        }

        .loading-subtitle {
          color: #80ff80;
          font-size: clamp(0.7rem, 2.5vw, 0.9rem);
          opacity: 0.8;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .progress-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .progress-bar {
          width: min(200px, 80%);
          height: 8px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid #00ff00;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ff00, #00ff88, #00ff00);
          animation: progressFlow 2s ease-in-out infinite;
          border-radius: 4px;
          box-shadow: 0 0 10px #00ff88;
        }

        .progress-text {
          color: #00ff88;
          font-size: clamp(0.6rem, 2vw, 0.8rem);
          font-weight: bold;
          text-shadow: 0 0 5px #00ff88;
        }

        /* Floating Symbols */
        .floating-symbols {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-symbol {
          position: absolute;
          color: rgba(0, 255, 136, 0.6);
          animation: symbolFloat 8s ease-in-out infinite;
          text-shadow: 0 0 10px #00ff88;
          font-weight: bold;
        }

        /* Animations */
        @keyframes fogFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-20px) translateX(10px) scale(1.1); }
          50% { transform: translateY(-10px) translateX(-15px) scale(0.9); }
          75% { transform: translateY(-30px) translateX(5px) scale(1.05); }
        }

        @keyframes particleFloat {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          25% { transform: translateY(-30px) scale(1.2); opacity: 1; }
          50% { transform: translateY(-15px) scale(0.8); opacity: 0.8; }
          75% { transform: translateY(-45px) scale(1.1); opacity: 0.9; }
        }

        @keyframes circleRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes runeGlow {
          0% { 
            color: #00ff88; 
            text-shadow: 0 0 10px #00ff88;
            transform: scale(1);
          }
          100% { 
            color: #88ff00; 
            text-shadow: 0 0 20px #88ff00;
            transform: scale(1.2);
          }
        }

        @keyframes crystalPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }

        @keyframes waveExpand {
          0% { 
            width: 33%; 
            height: 33%; 
            opacity: 1; 
            border-width: 2px;
          }
          100% { 
            width: 100%; 
            height: 100%; 
            opacity: 0; 
            border-width: 1px;
          }
        }

        @keyframes textGlow {
          0% { 
            text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
            transform: scale(1);
          }
          100% { 
            text-shadow: 0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00;
            transform: scale(1.02);
          }
        }

        @keyframes progressFlow {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }

        @keyframes symbolFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3; 
          }
          25% { 
            transform: translateY(-20px) rotate(90deg); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.5; 
          }
          75% { 
            transform: translateY(-30px) rotate(270deg); 
            opacity: 0.8; 
          }
        }

        @keyframes energyLineFlow {
          0% { 
            transform: translateY(-100%) scaleY(0.5);
            opacity: 0;
          }
          50% { 
            transform: translateY(0%) scaleY(1);
            opacity: 1;
          }
          100% { 
            transform: translateY(100%) scaleY(0.5);
            opacity: 0;
          }
        }

        @keyframes cornerPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.5);
            opacity: 0.6;
          }
        }

        @media (max-width: 768px) {
          .magical-preview {
            min-height: 350px;
          }
          
          .magic-circle-container {
            width: min(35%, 150px);
            height: min(35%, 150px);
            min-width: 100px;
            min-height: 100px;
          }
          
          .loading-title {
            font-size: clamp(0.9rem, 5vw, 1.2rem);
          }
          
          .loading-subtitle {
            font-size: clamp(0.6rem, 3vw, 0.8rem);
          }
          
          .progress-text {
            font-size: clamp(0.5rem, 2.5vw, 0.7rem);
          }
        }

        @media (max-height: 400px) {
          .magical-preview {
            min-height: 300px;
          }
          
          .loading-text-container {
            padding: 10px 0;
            min-height: 60px;
          }
          
          .loading-title {
            margin-bottom: 0.25rem;
          }
          
          .loading-subtitle {
            margin-bottom: 0.5rem;
          }
        }

        @media (min-height: 600px) {
          .magical-preview {
            min-height: 500px;
          }
          
          .magic-circle-container {
            width: min(35%, 250px);
            height: min(35%, 250px);
          }
          
          .loading-text-container {
            padding: 30px 0;
          }
        }
      `}</style>
    </div>
  );
};

// Updated renderPreview function
const CharacterGeneratorPreview = ({ isLoading, videoUrl, generatePrompt }: { isLoading: boolean, videoUrl: string, generatePrompt: () => string }) => {
  if (isLoading) {
    return <MagicalLoadingPreview />;
  }

  if (videoUrl) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4 text-green-400">Generated Character</h3>
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border-2 border-green-400">
          <video 
            src={videoUrl}
            controls
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <p className="text-green-300 text-sm text-center opacity-80">
          Your character has been generated! You can now use this in battle.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-xl font-bold mb-4 text-green-400">Generated Prompt</h3>
      <div className="bg-black bg-opacity-60 rounded-xl p-4 border border-green-500">
        <pre className="whitespace-pre-wrap font-mono text-sm text-green-300">
          {generatePrompt()}
        </pre>
      </div>
    </>
  );
};

export default CharacterGeneratorPreview;   