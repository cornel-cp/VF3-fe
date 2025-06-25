import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Text } from '../ui/Text';
import { Heading } from '../ui/Heading';
import { X } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { formatBalance } from '@/utils/format';
import { useWallet } from '@solana/wallet-adapter-react';
import { ApiService } from '@/lib/ApiService';
import bs58 from 'bs58';

interface WithdrawModalProps {
  onClose: () => void;
}

export const WithdrawModal = ({ onClose }: WithdrawModalProps) => {
  const [amount, setAmount] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { user, isLoading, error } = useUser();
  const { connected, publicKey, signMessage } = useWallet();
  

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleWithdraw = async () => {
    if (!signMessage || !publicKey) {
      console.error('Wallet not properly connected');
      return;
    }

    try {
      const request = await ApiService.getInstance().withdrawRequest(parseFloat(amount), publicKey.toBase58());
      const signedMessage = await signMessage(new TextEncoder().encode(request.message!));
      console.log(new TextEncoder().encode(request.message!), "encoded Message")
      console.log(signedMessage)
      const withdrawal = await ApiService.getInstance().withdraw(bs58.encode(signedMessage));
      if(withdrawal.success) {
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Withdrawal failed:', error);
    }
  };

  const handleMaxAmount = () => {
    const maxWithdraw = Math.max(0, user?.balance || 0);
    setAmount(maxWithdraw.toString());
  };

  const isValidAmount = amount && parseFloat(amount) > 0 && parseFloat(amount) <= (user?.balance || 0);

  // Show loading state if user data is being fetched
  if (isLoading) {
    return (
      <div className="transform transition-all duration-700 scale-100 opacity-100">
        <Card
          hover={false}
          variant="default"
          className="relative max-w-md mx-auto overflow-hidden border border-yellow-500/20 shadow-glow"
        >
          <div className="p-6 text-center">
            <Heading level={2} className="text-yellow-400 mb-4">
              Loading...
            </Heading>
            <Text variant="secondary" size="sm">
              Fetching your account information
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="transform transition-all duration-700 scale-100 opacity-100">
        <Card
          hover={false}
          variant="default"
          className="relative max-w-md mx-auto overflow-hidden border border-red-500/20 shadow-glow"
        >
          <div className="p-6 text-center">
            <Heading level={2} className="text-red-400 mb-4">
              Error
            </Heading>
            <Text variant="secondary" size="sm" className="mb-4">
              Failed to load account information
            </Text>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Show wallet connection prompt if not connected
  if (!connected) {
    return (
      <div className="transform transition-all duration-700 scale-100 opacity-100">
        <Card
          hover={false}
          variant="default"
          className="relative max-w-md mx-auto overflow-hidden border border-yellow-500/20 shadow-glow"
        >
          <div className="p-6 text-center">
            <Heading level={2} className="text-yellow-400 mb-4">
              Wallet Not Connected
            </Heading>
            <Text variant="secondary" size="sm" className="mb-4">
              Please connect your wallet to withdraw funds
            </Text>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <Card
        hover={false}
        variant="default"
        className="relative max-w-md mx-auto overflow-hidden border border-yellow-500/20 shadow-glow"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 animate-pulse"></div>

        {/* Header */}
        <div className="relative p-6 border-b border-surface-tertiary/50">
          <div className="flex items-center justify-between">
            <div>
              <Heading level={2} className="text-yellow-400">
                Withdraw Funds
              </Heading>
              <Text variant="secondary" size="sm" className="mt-1">
                Send SOL to external wallet
              </Text>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-tertiary hover:text-primary transition-colors duration-200 
                         hover:bg-surface-elevated rounded-lg group"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-6">
          {/* Amount Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Text variant="secondary" size="sm" className="font-medium">
                Amount to Withdraw
              </Text>
              <div className="flex items-center space-x-2">
              <Text variant="default" className="font-bold text-lg">
                {formatBalance(user?.balance)}
              </Text>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMaxAmount}
                className="text-xs text-yellow-400 hover:text-yellow-300"
              >
                MAX
              </Button>
              </div>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`pr-12 ${!isValidAmount && amount ? 'border-red-500/50' : ''}`}
                max={user?.balance}
                step="0.000001"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                SOL
              </span>
            </div>
            {amount && !isValidAmount && (
              <Text variant="danger" size="xs" className="text-red-400">
                {parseFloat(amount) > user?.balance 
                  ? 'Insufficient balance (including network fee)' 
                  : 'Amount must be greater than 0'}
              </Text>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500"
              onClick={handleWithdraw}
              disabled={!isValidAmount}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}; 