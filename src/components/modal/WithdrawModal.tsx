import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Text } from '../ui/Text';
import { Heading } from '../ui/Heading';
import { X, AlertTriangle, DollarSign } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

interface WithdrawModalProps {
  onClose: () => void;
}

export const WithdrawModal = ({ onClose }: WithdrawModalProps) => {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Mock current balance - in real app this would come from API/blockchain
  const currentBalance = 2.5; // SOL
  const networkFee = 0.000005; // SOL

  const handleWithdraw = () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }
    
    // TODO: Implement actual withdrawal logic
    console.log('Withdrawing:', amount, 'to:', toAddress);
    onClose();
  };

  const handleMaxAmount = () => {
    const maxWithdraw = Math.max(0, currentBalance - networkFee);
    setAmount(maxWithdraw.toString());
  };

  const isValidAmount = amount && parseFloat(amount) > 0 && parseFloat(amount) <= currentBalance - networkFee;
  const isValidAddress = toAddress.length >= 32; // Basic Solana address validation

  if (showConfirmation) {
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
                  Confirm Withdrawal
                </Heading>
                <Text variant="secondary" size="sm" className="mt-1">
                  Please review your transaction
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

          {/* Confirmation Content */}
          <div className="relative p-6 space-y-6">
            {/* Transaction Summary */}
            <div className="space-y-4">
              <div className="p-4 bg-surface-secondary rounded-xl border border-surface-elevated">
                <div className="flex justify-between items-center mb-2">
                  <Text variant="secondary" size="sm">Amount:</Text>
                  <Text variant="default" className="font-medium">{amount} SOL</Text>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <Text variant="secondary" size="sm">Network Fee:</Text>
                  <Text variant="muted" size="sm">{networkFee} SOL</Text>
                </div>
                <div className="border-t border-surface-elevated pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <Text variant="secondary" size="sm" className="font-medium">Total Cost:</Text>
                    <Text variant="default" className="font-bold">{(parseFloat(amount) + networkFee).toFixed(6)} SOL</Text>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface-secondary rounded-xl border border-surface-elevated">
                <Text variant="secondary" size="sm" className="mb-2">To Address:</Text>
                <Text variant="muted" size="xs" className="font-mono break-all">{toAddress}</Text>
              </div>
            </div>

            {/* Warning */}
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <Text variant="secondary" size="sm" className="font-medium text-red-400 mb-1">
                  Important Warning
                </Text>
                <Text variant="muted" size="xs" className="text-red-300">
                  This transaction cannot be reversed. Please double-check the recipient address.
                </Text>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setShowConfirmation(false)}
              >
                Go Back
              </Button>
              <Button
                variant="gradient"
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500"
                onClick={handleWithdraw}
              >
                Confirm Withdrawal
              </Button>
            </div>
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
          {/* Current Balance */}
          <div className="p-4 bg-surface-secondary rounded-xl border border-surface-elevated">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <Text variant="secondary" size="sm" className="font-medium">
                  Available Balance
                </Text>
              </div>
              <Text variant="default" className="font-bold text-lg">
                {currentBalance} SOL
              </Text>
            </div>
          </div>

          {/* Recipient Address */}
          <div className="space-y-3">
            <Text variant="secondary" size="sm" className="font-medium">
              Recipient Address
            </Text>
            <Input
              placeholder="Enter Solana wallet address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className={`font-mono ${!isValidAddress && toAddress ? 'border-red-500/50' : ''}`}
            />
            {toAddress && !isValidAddress && (
              <Text variant="danger" size="xs" className="text-red-400">
                Please enter a valid Solana address
              </Text>
            )}
          </div>

          {/* Amount Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Text variant="secondary" size="sm" className="font-medium">
                Amount to Withdraw
              </Text>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMaxAmount}
                className="text-xs text-yellow-400 hover:text-yellow-300"
              >
                MAX
              </Button>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`pr-12 ${!isValidAmount && amount ? 'border-red-500/50' : ''}`}
                max={currentBalance - networkFee}
                step="0.000001"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                SOL
              </span>
            </div>
            {amount && !isValidAmount && (
              <Text variant="danger" size="xs" className="text-red-400">
                {parseFloat(amount) > currentBalance - networkFee 
                  ? 'Insufficient balance (including network fee)' 
                  : 'Amount must be greater than 0'}
              </Text>
            )}
          </div>

          {/* Fee Information */}
          <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <Text variant="secondary" size="sm" className="font-medium text-yellow-400 mb-2">
              Transaction Details:
            </Text>
            <div className="space-y-1 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Network Fee:</span>
                <span>{networkFee} SOL</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span>1-2 minutes</span>
              </div>
              {amount && isValidAmount && (
                <div className="flex justify-between font-medium text-yellow-400 pt-1 border-t border-yellow-500/20">
                  <span>Total Cost:</span>
                  <span>{(parseFloat(amount) + networkFee).toFixed(6)} SOL</span>
                </div>
              )}
            </div>
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
              disabled={!isValidAmount || !isValidAddress}
            >
              Review Withdrawal
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}; 