import React, { useCallback, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Text } from '../ui/Text';
import { Heading } from '../ui/Heading';
import { X, Copy, ExternalLink } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { SolanaRpcService } from '@/lib/Solana';
import { ApiService } from '@/lib/ApiService';
import { useUser } from '@/hooks/useUser';

interface DepositModalProps {
  onClose: () => void;
}

export const DepositModal = ({ onClose }: DepositModalProps) => {
  const wallet = useWallet();
  const [amount, setAmount] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user, setUser } = useUser();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const walletAddress = wallet.publicKey?.toBase58() || '';

  const handleCopyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeposit = useCallback(async () => {
    if (!wallet || !wallet.publicKey) {
      setError('Please connect your wallet');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const signature = await SolanaRpcService.getInstance().deposit(
        parseFloat(amount), 
        wallet
      );

      const response = await ApiService.getInstance().sendDepositSignature(signature);
      if (response.success) {
        setSuccess('Deposit successful!');
        setUser(response.user)
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError('Deposit failed. Please try again.');
      }
      
    } catch (error) {
      console.error('Deposit failed:', error);
      setError(error instanceof Error ? error.message : 'Deposit failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [amount, wallet, onClose]);

  const openInExplorer = () => {
    if (walletAddress) {
      window.open(`https://explorer.solana.com/address/${walletAddress}`, '_blank');
    }
  };

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <Card
        hover={false}
        variant="default"
        className="relative max-w-md mx-auto overflow-hidden border border-green-500/20 shadow-glow"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 animate-pulse"></div>

        {/* Header */}
        <div className="relative p-6 border-b border-surface-tertiary/50">
          <div className="flex items-center justify-between">
            <div>
              <Heading level={2} className="text-green-400">
                Deposit Funds
              </Heading>
              <Text variant="secondary" size="sm" className="mt-1">
                Add SOL to your wallet
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
          {/* Wallet Address Section */}
          <div className="space-y-3">
            <Text variant="secondary" size="sm" className="font-medium">
              Your Wallet Address
            </Text>
            <div className="flex items-center space-x-2 p-3 bg-surface-secondary rounded-xl border border-surface-elevated">
              <Text variant="muted" size="sm" className="flex-1 font-mono truncate">
                {walletAddress}
              </Text>
              <button
                onClick={handleCopyAddress}
                className="p-2 text-text-tertiary hover:text-green-400 transition-colors rounded-lg"
                title="Copy address"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={openInExplorer}
                className="p-2 text-text-tertiary hover:text-green-400 transition-colors rounded-lg"
                title="View in explorer"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <Text variant="success" size="sm" className="text-green-400">
                Address copied to clipboard!
              </Text>
            )}
          </div>

          {/* Quick Deposit Section */}
          <div className="space-y-3">
            <Text variant="secondary" size="sm" className="font-medium">
              Quick Deposit Amount
            </Text>
            <div className="grid grid-cols-3 gap-2">
              {['0.1', '0.5', '1.0'].map((value) => (
                <Button
                  key={value}
                  variant="ghost"
                  size="sm"
                  onClick={() => setAmount(value)}
                  className="border border-surface-elevated hover:border-green-500/30"
                >
                  {value} SOL
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-3">
            <Text variant="secondary" size="sm" className="font-medium">
              Custom Amount
            </Text>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                SOL
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <Text variant="secondary" size="sm" className="text-red-400">
                {error}
              </Text>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <Text variant="secondary" size="sm" className="text-green-400">
                {success}
              </Text>
            </div>
          )}

          {/* Instructions */}
          <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <Text variant="secondary" size="sm" className="font-medium text-green-400 mb-2">
              How to deposit:
            </Text>
            <ul className="space-y-1 text-xs text-text-secondary">
              <li>• Copy your wallet address above</li>
              <li>• Send SOL from your external wallet or exchange</li>
              <li>• Funds will appear automatically once confirmed</li>
              <li>• Transaction usually takes 1-2 minutes</li>
            </ul>
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
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
              onClick={handleDeposit}
              disabled={!amount || parseFloat(amount) <= 0 || isLoading}
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}; 