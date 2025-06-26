"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Spinner } from '@/components/ui/Spinner';
import { ApiService } from '@/lib/ApiService';
import { ICharacter } from '@/types';
import { BattleCharacterCard } from '@/components/wedget/BattleCharacterCard';

const BattlePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const characterId = searchParams.get('characterId');
  
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>('0.1');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!characterId) return;
      
      try {
        setLoading(true);
        const characterData = await ApiService.getInstance().getCharacterById(characterId);
        setCharacter(characterData);
      } catch (err) {
        console.error('Failed to fetch character:', err);
        setError('Failed to load character');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [characterId]);

  const handleSelectHero = () => {
    router.push('/heroes');
  };

  const handleBetAmountChange = (value: string) => {
    // Allow empty string for user to clear input
    if (value === '') {
      setBetAmount('');
      return;
    }
    
    // Allow only numbers and one decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = cleanValue.split('.');
    if (parts.length > 2) {
      return; // Don't update if multiple decimal points
    }
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      setBetAmount(parts[0] + '.' + parts[1].substring(0, 2));
      return;
    }
    
    setBetAmount(cleanValue);
  };

  const handleCreateBattle = async () => {
    if (!character || !betAmount?.trim()) return;
    
    // Clean and convert the input to number
    const cleanAmount = betAmount.trim().replace(/[^0-9.]/g, ''); // Remove non-numeric chars except dots
    const bet = parseFloat(cleanAmount);
    
    // Validate the number
    if (isNaN(bet) || bet <= 0) {
      setError('Please enter a valid bet amount (minimum 0.01 SOL)');
      return;
    }
    
    if (bet < 0.01) {
      setError('Minimum bet amount is 0.01 SOL');
      return;
    }

    try {
      setCreating(true);
      setError(null); // Clear any previous errors
      const battleData = await ApiService.getInstance().createBattle(character._id, bet);
      router.push(`/battle/${battleData._id}`);
    } catch (err) {
      console.error('Failed to create battle:', err);
      setError('Failed to create battle');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            Loading Character...
          </Heading>
          <Spinner />
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-8">
      {/* Battle Setup Area */}
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center gap-4">
          {/* Character Card */}
          <div className="flex-shrink-0">
            <BattleCharacterCard 
              character={character || undefined}
              showSelectButton={!character}
              onSelectHero={handleSelectHero}
              betAmount={betAmount}
              onBetAmountChange={handleBetAmountChange}
              handleCreateBattle={handleCreateBattle}
              creating={creating}
              error={error}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

const BattlePage = () => {
  return (
    <Suspense fallback={
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            Loading Battle Setup...
          </Heading>
          <Spinner />
        </div>
      </Container>
    }>
      <BattlePageContent />
    </Suspense>
  );
};

export default BattlePage;