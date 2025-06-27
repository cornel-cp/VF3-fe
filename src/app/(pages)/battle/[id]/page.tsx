"use client";
import React, { useState, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Zap, Users, Loader2, Play } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ICharacter } from '@/types';
import { useBattle } from '@/hooks/useBattle';
import { ApiService } from '@/lib/ApiService';
import { BattleCharacterCard } from '@/components/wedget/BattleCharacterCard';
import { useCharacter } from '@/hooks/useCharacter';
import { useUser } from '@/hooks/useUser';



const BattleRoomPageContent = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const battleId = params.id as string;
  const characterId = searchParams.get('characterId');
  
  const { battle, isLoading: loading, error, joinBattle } = useBattle(battleId);
  const { user } = useUser();

  const {data: myCharacter} = useCharacter(characterId as string);
  
  // Check if current user is the battle creator
  const isCreator = user?._id === battle?.creator;
  
  const handleSelectHero = () => {
    router.push(`/heroes?battleId=${battleId}`);
  };

  const handleJoinBattle = async () => {
    if (!characterId || !battle) return;
    
    try {
        await joinBattle(characterId);
      // Battle data will be updated by the polling interval from the hook
    } catch (err) {
      console.error('Failed to join battle:', err);
    }
  };



  if (loading) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            Loading Battle Arena...
          </Heading>
          <Spinner />
        </div>
      </Container>
    );
  }

  if (error || !battle) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            Battle Not Found
          </Heading>
          <Text variant="secondary" className="mb-6">
            {typeof error === 'string' ? error : 'This battle does not exist or has been removed.'}
          </Text>
          <Button onClick={() => router.push('/battle')}>
            Back to Battle Arena
          </Button>
        </div>
      </Container>
    );
  }

  // Check if user has character and can join
  const canJoinBattle = characterId && !battle.challenger && battle.status === 'pending';

  console.log(isCreator);
  return (
    <Container size="default" className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Heading level={1} variant="gradient">
          Battle Arena
        </Heading>
        <Text variant="secondary" size="lg" className="mt-2">
          Bet Amount: {battle.betAmount} SOL
        </Text>
        <Badge variant={battle.status === 'pending' ? 'warning' : battle.status === 'active' ? 'primary' : 'success'} className="mt-2">
          {battle.status.toUpperCase()}
        </Badge>
      </div>

      {/* Battle Area */}
      <div className="flex flex-col md:flex-row items-center gap-2 justify-between max-h-screen">
        {/* Creator (Left) */}
        <BattleCharacterCard 
          character={battle.characterCreator}
          side="left"
          isWinner={battle.winner === 'creator'}
          isLoser={battle.winner === 'challenger'}
        />

        {/* Battle Controls */}
        <div className="flex flex-col items-center gap-4 min-w-0">
          <Text variant="gradient" size="xl" className="font-bold">VS</Text>
          
          {battle.status === 'pending' && !battle.challenger && !characterId && (
            <div className="text-center">
              <Text variant="default" size="lg" className="mb-2">Waiting for challenger...</Text>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            </div>
          )}

          {battle.status === 'video_generated' && battle.winner && (
            <div className="text-center space-y-4">
              <Button
                variant="gradient"
                size="lg"
                glow
                onClick={() => router.push(`/video/${battleId}`)}
                className="animate-pulse-glow"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Battle Video
              </Button>
            </div>
          )}
        </div>

        {/* Challenger (Right) */}
        <BattleCharacterCard
          isCreator={isCreator}
          character={
            // If current user is the creator, don't show their character on right side
            isCreator 
              ? battle.characterChallenger  // Show actual challenger (or nothing if no challenger)
              // If battle is pending and user has selected a character (and they're not creator), show their character
              : (battle.status === 'pending' && characterId && myCharacter) 
                ? myCharacter 
                // Otherwise show the actual challenger character
                : battle.characterChallenger
          }
          side="right"
          isWinner={battle.winner === 'challenger'}
          isLoser={battle.winner === 'creator'}
          showSelectButton={!isCreator && !battle.challenger && !characterId}
          onSelectHero={handleSelectHero}
          showJoinButton={!isCreator && battle.status === 'pending' && characterId && myCharacter && !battle.characterChallenger}
          onJoinBattle={handleJoinBattle}
          waitingMessage={isCreator ? "Waiting for challenger..." : "Waiting for challenger..."}
        />
      </div>
    </Container>
  );
};

const BattleRoomPage = () => {
  return (
    <Suspense fallback={
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            Loading Battle Arena...
          </Heading>
          <Spinner />
        </div>
      </Container>
    }>
      <BattleRoomPageContent />
    </Suspense>
  );
};

export default BattleRoomPage; 