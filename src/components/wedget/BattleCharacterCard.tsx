import React, { useState } from 'react';
import { Zap, Star, Users, Loader2, Clock, Trophy, Target, Sword, Shield, Brain, Sparkles, Coins } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ICharacter } from '@/types';

interface BattleCharacterCardProps {
  character?: ICharacter;
  side?: 'left' | 'right';
  isWinner?: boolean;
  isLoser?: boolean;
  showSelectButton?: boolean;
  onSelectHero?: () => void;
  isCreator?: boolean;
  // Battle creation props
  betAmount?: string;
  onBetAmountChange?: (amount: string) => void;
  handleCreateBattle?: () => void;
  creating?: boolean;
  error?: string | null;
  
  // Battle room props
  showJoinButton?: boolean;
  onJoinBattle?: () => void;
  joining?: boolean;
  showStartButton?: boolean;
  onStartBattle?: () => void;
  battleStarted?: boolean;
  
  // Waiting state
  waitingMessage?: string;
}

export const BattleCharacterCard = ({ 
  character, 
  side = 'left', 
  isWinner, 
  isLoser,
  isCreator,
  showSelectButton,
  onSelectHero,
  betAmount,
  onBetAmountChange,
  handleCreateBattle,
  creating,
  error,
  showJoinButton,
  onJoinBattle,
  joining,
  showStartButton,
  onStartBattle,
  battleStarted,
  waitingMessage = "Waiting for challenger..."
}: BattleCharacterCardProps) => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Debug logging
  console.log('BattleCharacterCard props:', { character, side, showSelectButton });

  if (!character && showSelectButton && !isCreator) {
    return (
      <Card variant="default" className="w-full max-w-xs overflow-hidden">
        <div className="relative aspect-[9/16] w-full bg-surface-secondary flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <Heading level={3} className="mb-4">Choose Your Hero</Heading>
            <Text variant="secondary" size="sm" className="mb-6">
              Select a character to {showJoinButton ? 'join this battle' : 'create a battle'}
            </Text>
            <Button variant="gradient" onClick={onSelectHero}>
              Select Hero
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (!character) {
    return (
      <Card variant="default" className="w-full max-w-xs overflow-hidden">
        <div className="relative aspect-[9/16] w-full bg-surface-secondary flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-surface-elevated rounded-full flex items-center justify-center mb-4 mx-auto">
              <Clock className="w-8 h-8 text-text-muted" />
            </div>
            <Heading level={3} className="mb-2">{waitingMessage.split('...')[0]}...</Heading>
            <Text variant="secondary" size="sm">
              {waitingMessage.includes('...') ? waitingMessage.split('...')[1] || 'Battle will start when another player joins' : waitingMessage}
            </Text>
          </div>
        </div>
      </Card>
    );
  }

  const getAttributeIcon = (attribute: string) => {
    switch (attribute) {
      case 'strength': return <Sword className="w-3 h-3" />;
      case 'speed': return <Zap className="w-3 h-3" />;
      case 'defense': return <Shield className="w-3 h-3" />;
      case 'intelligence': return <Brain className="w-3 h-3" />;
      case 'magicPower': return <Sparkles className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  const getAttributeColor = (value: number) => {
    if (value >= 8) return 'text-primary';
    if (value >= 6) return 'text-yellow-400';
    if (value >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <Card 
      variant={isWinner ? "gradient" : "default"}
              className={`w-full max-w-xs overflow-hidden`}
    >
      {/* Character Video/Image */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-surface-secondary">
        {character.video && character.video.length > 0 && !videoError ? (
          <>
            <video 
              src={character.video[0]}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
              onLoadStart={() => setIsLoading(true)}
              onLoadedData={() => setIsLoading(false)}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface-secondary">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <Text variant="secondary" size="xs">{character.name}</Text>
            </div>
          </div>
        )}
        
        {/* Loser Overlay */}
        {isLoser && (
          <div className="absolute inset-0 bg-black/50 z-10" />
        )}

        {/* Winner Overlay */}
        {isWinner && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20" >
            <div className="rotate-45 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black font-black text-3xl px-4 py-2 rounded-lg shadow-2xl border-2 border-yellow-300 animate-pulse">
              WINNER
            </div>
          </div>
        )}
        
        {/* Win/Loss Stats */}
        <div className="absolute top-2 right-2 flex gap-1 z-20">
          <Badge variant="success" size="sm">
            <Trophy className="w-2 h-2 mr-1" />
            {character.winNumber || 0}
          </Badge>
          <Badge variant="danger" size="sm">
            <Target className="w-2 h-2 mr-1" />
            {character.loseNumber || 0}
          </Badge>
        </div>

        {/* Battle Creation Controls Overlay */}
        {character && onBetAmountChange && handleCreateBattle && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 z-20">
            <div className="space-y-2">
              {/* Bet Amount Input */}
              <div>
                <Text variant="secondary" size="xs" className="mb-1 block text-white">
                  Bet Amount (SOL)
                </Text>
                <div className="relative">
                  <Coins className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/70" />
                  <Input
                    type="text"
                    value={betAmount || ''}
                    onChange={(e) => onBetAmountChange?.(e.target.value)}
                    placeholder="0.1"
                    className="pl-7 h-8 text-xs bg-black/50 border-white/30 text-white placeholder-white/50"
                  />
                </div>
              </div>
              
              {error && (
                <Text variant="danger" size="xs" className="text-center text-red-300">
                  {error}
                </Text>
              )}
              
              <Button
                variant="gradient"
                size="sm"
                glow
                onClick={handleCreateBattle}
                disabled={creating || !betAmount?.trim()}
                className="w-full h-8 text-xs animate-pulse-glow"
              >
                {creating ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Zap className="w-3 h-3 mr-1" />
                    CREATE BATTLE
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Battle Join Controls Overlay */}
        {character && showJoinButton && onJoinBattle && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 z-20">
            <Button
              variant="gradient"
              size="sm"
              glow
              onClick={onJoinBattle}
              disabled={joining}
              className="w-full h-8 text-xs animate-pulse-glow"
            >
              {joining ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 mr-1" />
                  JOIN BATTLE
                </>
              )}
            </Button>
          </div>
        )}

        {/* Battle Start Controls Overlay */}
        {character && showStartButton && onStartBattle && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 z-20">
            <Button
              variant="gradient"
              size="sm"
              glow
              onClick={onStartBattle}
              disabled={battleStarted}
              className="w-full h-8 text-xs animate-pulse-glow"
            >
              {battleStarted ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 mr-1" />
                  START BATTLE
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Character Info */}
      <div className="p-3 flex flex-col">
        <div className="mb-2">
          <Heading level={4} variant="gradient" className="text-sm mb-1">{character.name}</Heading>
          <div className="flex gap-1">
            <Badge variant="default" size="sm" className="text-xs">{character.size || 'Medium'}</Badge>
            <Badge variant="default" size="sm" className="text-xs">{character.bodyType || 'Normal'}</Badge>
          </div>
        </div>

        {/* Attributes */}
        <div className="flex-1">
          <Text variant="secondary" size="xs" className="font-medium mb-1">Attributes</Text>
          <div className="grid grid-cols-2 gap-1">
            {[
              { key: 'strength', label: 'STR', value: character.strength },
              { key: 'speed', label: 'SPD', value: character.speed },
              { key: 'defense', label: 'DEF', value: character.defense },
              { key: 'intelligence', label: 'INT', value: character.intelligence },
            ].map(({ key, label, value }) => (
              <div key={key} className="flex items-center justify-between p-1 bg-surface-secondary rounded text-xs">
                <div className="flex items-center gap-1">
                  {getAttributeIcon(key)}
                  <Text variant="muted" size="xs">{label}</Text>
                </div>
                <Text variant="default" size="xs" className={`font-bold ${getAttributeColor(value)}`}>
                  {value}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Power */}
        <div className="mt-2">
          <Text variant="secondary" size="xs" className="font-medium mb-1">Primary Power</Text>
          <Text variant="muted" size="xs" className="line-clamp-1">{character.primaryPower}</Text>
        </div>
      </div>
    </Card>
  );
}; 