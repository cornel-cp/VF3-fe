"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Zap, Users, Loader2, Play, Clock } from 'lucide-react';
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
import { SideBetCard } from '@/components/wedget/SideBetCard';
import { useCharacter } from '@/hooks/useCharacter';
import { useUser } from '@/hooks/useUser';
import { useSideBet } from '@/hooks/useSideBet';



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

  const [joining, setJoining] = useState(false);
  const [starting, setStarting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Use side bet hook
  const { sideBets, isLoading: loadingSideBets, placeSideBet } = useSideBet(
    battleId,
    !!battle?.characterChallenger
  );

  // Calculate time remaining until battle can start
  useEffect(() => {
    if (battle?.status === 'joined' && battle.startedAt) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const startTime = new Date(battle.startedAt).getTime();
        const timeDiff = startTime - now;

        console.log(timeDiff, "HHHHHHHHHHHHHH")

        if (timeDiff <= 0) {
          setTimeRemaining('');
          return;
        }

        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }
  }, [battle?.status, battle?.starttime]);

  const handleStartBattle = async () => {
    if (!battleId || !battle) return;
    
    try {
      setStarting(true);
      await ApiService.getInstance().startBattle(battleId);
      // Battle data will be updated by the polling interval from the hook
    } catch (err) {
      console.error('Failed to start battle:', err);
    } finally {
      setStarting(false);
    }
  };

  const handleJoinBattle = async () => {
    if (!characterId || !battle) return;
    
    try {
      setJoining(true);
      await joinBattle(characterId);
      // Battle data will be updated by the polling interval from the hook
    } catch (err) {
      console.error('Failed to join battle:', err);
    } finally {
      setJoining(false);
    }
  };

  const handlePlaceSideBet = async (side: 'creator' | 'challenger', amount: number) => {
    try {
      await placeSideBet(side, amount);
    } catch (error) {
      console.error('Failed to place side bet:', error);
      throw error;
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
  
  // Check if current user is a participant (creator or challenger)
  const isParticipant = user?._id === battle?.creator || user?._id === battle?.challenger;
  
  // Check if side betting should be shown (challenger has joined and battle not started)
  const showSideBetting = battle?.characterChallenger && !isParticipant && ['joined', 'pending'].includes(battle?.status || '');

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
        <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
          <BattleCharacterCard 
            character={battle.characterCreator}
            side="left"
            isWinner={battle.winner === 'creator'}
            isLoser={battle.winner === 'challenger'}
          />
          
          {/* Side Betting for Creator */}
          {showSideBetting && (
            <SideBetCard
              side="creator"
              characterName={battle.characterCreator?.name}
              totalBets={sideBets?.creator?.total || 0}
              betCount={sideBets?.creator?.count || 0}
              onPlaceBet={(amount) => handlePlaceSideBet('creator', amount)}
              disabled={loadingSideBets}
              isLoading={loadingSideBets}
            />
          )}
        </div>

        {/* Battle Controls */}
        <div className="flex flex-col items-center gap-4 min-w-0">
          <Text variant="gradient" size="xl" className="font-bold">VS</Text>
          
          {/* Waiting for challenger */}
          {battle.status === 'pending' && !battle.challenger && !characterId && (
            <div className="text-center">
              <Text variant="default" size="lg" className="mb-2">Waiting for challenger...</Text>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            </div>
          )}

          {/* Challenger joined, waiting for start time */}
          {(battle.status === 'joined') && (
            <div className="text-center space-y-4">
              {timeRemaining ? (
                <>
                  <Text variant="default" size="lg" className="mb-2">Battle can start in:</Text>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <Text variant="gradient" size="xl" className="font-bold font-mono">
                      {timeRemaining}
                    </Text>
                  </div>
                </>
              ) : (
                <>
                  {isParticipant ? (
                    <Button
                      variant="gradient"
                      size="lg"
                      glow
                      onClick={handleStartBattle}
                      disabled={starting}
                      className="animate-pulse-glow"
                    >
                      {starting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Starting Battle...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Start Battle
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="text-center">
                      <Text variant="default" size="lg" className="mb-2">Battle is ready to start</Text>
                      <Text variant="secondary" size="sm">Waiting for participants to start...</Text>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Battle started - waiting for prediction */}
          {((battle.status === 'finished' && !battle.winner)) && (
            <div className="text-center">
              <Text variant="default" size="lg" className="mb-2">Waiting for battle prediction...</Text>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            </div>
          )}

          {/* Battle finished, winner determined, waiting for video */}
          {battle.status === 'finished' && battle.winner && (!battle.video || battle.video.length === 0) && (
            <div className="text-center">
              <Text variant="default" size="lg" className="mb-2">Waiting for video generation...</Text>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            </div>
          )}

          {/* Video ready */}
          {(battle.status === 'video_generated' || (battle.status === 'finished' && battle.video && battle.video.length > 0)) && battle.winner && (
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
        <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
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
            joining={joining}
            waitingMessage={isCreator ? "Waiting for challenger..." : "Waiting for challenger..."}
          />
          
          {/* Side Betting for Challenger */}
          {showSideBetting && battle.characterChallenger && (
            <SideBetCard
              side="challenger"
              characterName={battle.characterChallenger?.name}
              totalBets={sideBets?.challenger?.total || 0}
              betCount={sideBets?.challenger?.count || 0}
              onPlaceBet={(amount) => handlePlaceSideBet('challenger', amount)}
              disabled={loadingSideBets}
              isLoading={loadingSideBets}
            />
          )}
        </div>
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