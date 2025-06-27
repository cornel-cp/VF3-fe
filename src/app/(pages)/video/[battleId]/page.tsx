"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trophy, Target, Zap, Star, Loader2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { useBattle } from '@/hooks/useBattle';

const BattleVideoPage = () => {
  const params = useParams();
  const router = useRouter();
  const battleId = params.battleId as string;
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { battle, isLoading: loading, error } = useBattle(battleId);
  console.log(battle, "battle");    

  if (loading) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            Loading Battle Video...
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
            Battle Video Not Found
          </Heading>
          <Text variant="secondary" className="mb-6">
            {typeof error === 'string' ? error : 'This battle video does not exist or has been removed.'}
          </Text>
          <Button onClick={() => router.push('/battle')}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Battle Arena
          </Button>
        </div>
      </Container>
    );
  }

  if (!battle.video || battle.video.length === 0) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            No Battle Video Available
          </Heading>
          <Text variant="secondary" className="mb-6">
            The battle video is not yet available or failed to generate.
          </Text>
          <Button onClick={() => router.push(`/battle/${battleId}`)}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Battle Room
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Heading level={1} variant="gradient">
            Battle Video
          </Heading>
          <Text variant="secondary" size="lg" className="mt-2">
            {battle.characterCreator?.name} vs {battle.characterChallenger?.name}
          </Text>
        </div>
        <Button variant="secondary" onClick={() => router.push(`/battle/${battleId}`)}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Battle
        </Button>
      </div>

      {/* Video Player */}
      <Card variant="default" className="mb-8 overflow-hidden">
        <div className="relative w-full aspect-video bg-surface-secondary">
          {!videoError ? (
            <>
              <video 
                src={battle.video[0]}
                controls
                autoPlay
                className="w-full h-full object-cover"
                onError={() => setVideoError(true)}
                onLoadStart={() => setIsLoading(true)}
                onLoadedData={() => setIsLoading(false)}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-secondary">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <Text variant="secondary" size="lg">Failed to load battle video</Text>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Battle Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Winner & Summary */}
        <Card variant="default" className="p-6">
          <Heading level={2} className="mb-4">Battle Result</Heading>
          
          {battle.winner && (
            <div className="mb-6">
              <Badge variant="gradient" size="lg" className="mb-4">
                <Trophy className="w-4 h-4 mr-2" />
                {battle.winner === 'creator' ? battle.characterCreator?.name : battle.characterChallenger?.name} WINS!
              </Badge>
              <div className="flex items-center gap-4 text-sm">
                <Text variant="secondary">Confidence: {battle.confidence}%</Text>
                <Text variant="secondary">Bet: {battle.betAmount} SOL</Text>
              </div>
            </div>
          )}

          {battle.battleSummary && (
            <div className="mb-4">
              <Text variant="secondary" size="sm" className="font-medium mb-2">Battle Summary</Text>
              <Text variant="muted" size="sm" className="leading-relaxed">
                {battle.battleSummary}
              </Text>
            </div>
          )}

          {battle.reasoning && (
            <div>
              <Text variant="secondary" size="sm" className="font-medium mb-2">Victory Reasoning</Text>
              <Text variant="muted" size="sm" className="leading-relaxed">
                {battle.reasoning}
              </Text>
            </div>
          )}
        </Card>

        {/* Key Factors & Characters */}
        <Card variant="default" className="p-6">
          <Heading level={2} className="mb-4">Battle Analysis</Heading>
          
          {battle.keyFactors && battle.keyFactors.length > 0 && (
            <div className="mb-6">
              <Text variant="secondary" size="sm" className="font-medium mb-3">Key Deciding Factors</Text>
              <div className="space-y-2">
                {battle.keyFactors.map((factor: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <Zap className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                    <Text variant="muted" size="sm">{factor}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Character Stats */}
          <div>
            <Text variant="secondary" size="sm" className="font-medium mb-3">Fighters</Text>
            <div className="space-y-3">
              {/* Creator */}
              <div className={`p-3 rounded-lg border ${battle.winner === 'creator' ? 'border-primary bg-primary/10' : 'border-surface-tertiary bg-surface-secondary'}`}>
                <div className="flex items-center justify-between mb-2">
                  <Text variant="default" size="sm" className="font-medium">
                    {battle.characterCreator?.name}
                  </Text>
                  <div className="flex gap-1">
                    <Badge variant="success" size="sm">
                      <Trophy className="w-2 h-2 mr-1" />
                      {battle.characterCreator?.winNumber || 0}
                    </Badge>
                    <Badge variant="danger" size="sm">
                      <Target className="w-2 h-2 mr-1" />
                      {battle.characterCreator?.loseNumber || 0}
                    </Badge>
                  </div>
                </div>
                <Text variant="muted" size="xs">
                  {battle.characterCreator?.primaryPower}
                </Text>
              </div>

              {/* Challenger */}
              <div className={`p-3 rounded-lg border ${battle.winner === 'challenger' ? 'border-primary bg-primary/10' : 'border-surface-tertiary bg-surface-secondary'}`}>
                <div className="flex items-center justify-between mb-2">
                  <Text variant="default" size="sm" className="font-medium">
                    {battle.characterChallenger?.name}
                  </Text>
                  <div className="flex gap-1">
                    <Badge variant="success" size="sm">
                      <Trophy className="w-2 h-2 mr-1" />
                      {battle.characterChallenger?.winNumber || 0}
                    </Badge>
                    <Badge variant="danger" size="sm">
                      <Target className="w-2 h-2 mr-1" />
                      {battle.characterChallenger?.loseNumber || 0}
                    </Badge>
                  </div>
                </div>
                <Text variant="muted" size="xs">
                  {battle.characterChallenger?.primaryPower}
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button variant="secondary" onClick={() => router.push('/battle')}>
          New Battle
        </Button>
        <Button variant="gradient" onClick={() => router.push('/heroes')}>
          My Heroes
        </Button>
      </div>
    </Container>
  );
};

export default BattleVideoPage; 