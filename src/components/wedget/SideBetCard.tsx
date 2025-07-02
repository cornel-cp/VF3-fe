import React, { useState } from 'react';
import { Coins, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';

interface SideBetCardProps {
  side: 'creator' | 'challenger';
  characterName?: string;
  totalBets?: number;
  betCount?: number;
  onPlaceBet: (amount: number) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const SideBetCard: React.FC<SideBetCardProps> = ({
  side,
  characterName,
  totalBets = 0,
  betCount = 0,
  onPlaceBet,
  disabled = false,
  isLoading = false
}) => {
  const [betAmount, setBetAmount] = useState<string>('');
  const [isPlacing, setIsPlacing] = useState(false);

  const handlePlaceBet = async () => {
    const amount = parseFloat(betAmount);
    if (!amount || amount <= 0) return;

    try {
      setIsPlacing(true);
      await onPlaceBet(amount);
      setBetAmount('');
    } catch (error) {
      console.error('Failed to place bet:', error);
    } finally {
      setIsPlacing(false);
    }
  };

  const isValidAmount = betAmount && parseFloat(betAmount) > 0;

  return (
    <Card className="w-full max-w-xs p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 backdrop-blur-sm">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className={`w-4 h-4 ${side === 'creator' ? 'text-blue-400' : 'text-purple-400'}`} />
            <Text variant="default" size="sm" className="font-medium">
              Bet on {characterName || (side === 'creator' ? 'Creator' : 'Challenger')}
            </Text>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-xs">
          <div className="flex items-center space-x-1">
            <Coins className="w-3 h-3 text-yellow-400" />
            <Text variant="secondary" size="xs">
              {totalBets.toFixed(2)} SOL
            </Text>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 text-gray-400" />
            <Text variant="secondary" size="xs">
              {betCount} bets
            </Text>
          </div>
        </div>

        {/* Bet Input */}
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="0.0"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            disabled={disabled || isLoading}
            className="text-sm"
            step="0.1"
            min="0"
          />
          
          <Button
            variant={side === 'creator' ? 'primary' : 'secondary'}
            size="sm"
            onClick={handlePlaceBet}
            disabled={!isValidAmount || disabled || isLoading || isPlacing}
            className="w-full"
          >
            {isPlacing ? 'Placing...' : `Bet ${betAmount || '0'} SOL`}
          </Button>
        </div>

        {/* Quick bet amounts */}
        <div className="flex space-x-1">
          {[0.1, 0.5, 1.0].map((amount) => (
            <Button
              key={amount}
              variant="ghost"
              size="sm"
              onClick={() => setBetAmount(amount.toString())}
              disabled={disabled || isLoading}
              className="flex-1 text-xs"
            >
              {amount}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}; 