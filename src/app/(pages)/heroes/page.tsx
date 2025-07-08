"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Star, Zap, Shield, Sword, Brain, Sparkles, Trophy, Target, Loader2, Edit, Swords, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ApiService } from '@/lib/ApiService';
import { ICharacter } from '@/types';
import { useUser } from '@/hooks/useUser';

interface CharacterCardProps {
  character: ICharacter;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const searchParams = useSearchParams();
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const battleId = searchParams.get('battleId');

  const handleEdit = () => {
    // Navigate to generate page with only character ID
    router.push(`/generate?characterId=${character._id}`);
  };

  const handleBattle = () => {
    if (battleId) {
      // Join existing battle with this character
      router.push(`/battle/${battleId}?characterId=${character._id}`);
    } else {
      // Navigate to battle page with character ID only
      router.push(`/battle?characterId=${character._id}`);
    }
  };

  const getAttributeIcon = (attribute: string) => {
    switch (attribute) {
      case 'strength': return <Sword className="w-4 h-4" />;
      case 'speed': return <Zap className="w-4 h-4" />;
      case 'defense': return <Shield className="w-4 h-4" />;
      case 'intelligence': return <Brain className="w-4 h-4" />;
      case 'magicPower': return <Sparkles className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getAttributeColor = (value: number) => {
    if (value >= 8) return 'text-primary';
    if (value >= 6) return 'text-yellow-400';
    if (value >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <Card variant="default" className="w-full max-w-sm overflow-hidden h-full flex flex-col">
      {/* Character Video/Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-secondary flex-shrink-0">
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
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}
          </>
        ) : (
          // Fallback when video fails to load or doesn't exist
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <Text variant="secondary" size="sm">{character.name}</Text>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Win/Loss Stats */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="success" size="sm">
            <Trophy className="w-3 h-3 mr-1" />
            {character.winNumber || 0}
          </Badge>
          <Badge variant="danger" size="sm">
            <Target className="w-3 h-3 mr-1" />
            {character.loseNumber || 0}
          </Badge>
        </div>
      </div>

      {/* Character Info */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Name and Physical Build */}
        <div className="mb-3">
          <div className="h-20 flex items-start mb-2">
            <Heading level={3} variant="gradient" className="line-clamp-2">{character.name}</Heading>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" size="sm">{character.size}</Badge>
            <Badge variant="default" size="sm">{character.bodyType}</Badge>
            <Badge variant="default" size="sm">{character.height}</Badge>
          </div>
        </div>

        {/* Combat Style */}
        <div className="mb-3">
          <Text variant="secondary" size="sm" className="font-medium mb-1">Fighting Style</Text>
          <div className="h-8">
            <Text variant="muted" size="xs" className="line-clamp-1">{character.fightingStyle}</Text>
            <Text variant="muted" size="xs" className="line-clamp-1">Weapon: {character.weapons}</Text>
          </div>
        </div>

        {/* Attributes */}
        <div className="mb-3">
          <Text variant="secondary" size="sm" className="font-medium mb-2">Attributes</Text>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: 'strength', label: 'STR', value: character.strength },
              { key: 'speed', label: 'SPD', value: character.speed },
              { key: 'defense', label: 'DEF', value: character.defense },
              { key: 'intelligence', label: 'INT', value: character.intelligence },
              { key: 'magicPower', label: 'MAG', value: character.magicPower }
            ].map(({ key, label, value }) => (
              <div key={key} className="flex items-center justify-between p-2 bg-surface-secondary rounded">
                <div className="flex items-center gap-1">
                  {getAttributeIcon(key)}
                  <Text variant="muted" size="xs">{label}</Text>
                </div>
                <Text variant="default" size="sm" className={`font-bold ${getAttributeColor(value)}`}>
                  {value}/10
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Power */}
        <div className="mb-3">
          <Text variant="secondary" size="sm" className="font-medium mb-1">Primary Power</Text>
          <div className="h-4">
            <Text variant="muted" size="xs" className="line-clamp-1">{character.primaryPower}</Text>
          </div>
        </div>

        {/* Critical Weakness */}
        <div className="mb-4 flex-1">
          <Text variant="secondary" size="sm" className="font-medium mb-1">Critical Weakness</Text>
          <div className="h-4">
            <Text variant="muted" size="xs" className="text-red-400 line-clamp-1">{character.criticalWeakness}</Text>
          </div>
        </div>

        {/* Action Buttons - Always at bottom */}
        <div className="flex gap-2 mt-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleEdit}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="gradient"
            size="sm"
            onClick={handleBattle}
            className="flex-1"
          >
            <Swords className="w-4 h-4 mr-1" />
            {battleId ? 'Join Adventure' : 'Adventure'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const HeroesPageContent = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getInstance().getHeroes();
        const apiCharacters = response.characters || [];
        console.log(apiCharacters);
        setCharacters(apiCharacters);
      } catch (err) {
        console.error('Failed to fetch characters:', err);
        setError('Failed to load characters');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCharacters();
    }
  }, [user]);

  const handleGenerateCharacter = () => {
    router.push('/generate');
  };

  if (!user) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            My Heroes
          </Heading>
          <Text variant="secondary">Please connect your wallet to view your characters</Text>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-8">
            My Heroes
          </Heading>
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-4">
            My Heroes
          </Heading>
          <Text variant="danger" className="mb-6">{error}</Text>
          <Button onClick={handleGenerateCharacter} variant="gradient">
            <Plus className="w-5 h-5 mr-2" />
            Generate Your First Character
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <Heading level={1} variant="gradient" className="mb-4">
          My Heroes
        </Heading>
        <Text variant="secondary" size="lg">
          Your Generated Characters ({characters.length})
        </Text>
      </div>

      {/* Characters Grid */}
      {characters.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-primary/30 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Star className="w-10 h-10 text-primary" />
          </div>
          <Heading level={2} className="mb-4">No Heroes Created Yet</Heading>
          <Text variant="warm" className="mb-8 max-w-md mx-auto">
            You haven't created any magical heroes yet. Let's bring your first adventurer to life and start exploring wonderful worlds together!
          </Text>
          <Button onClick={handleGenerateCharacter} variant="gradient" size="lg" glow>
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Hero
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {characters.map((character) => (
              <CharacterCard key={character._id} character={character} />
            ))}
          </div>
          
          {/* Add Character Button */}
          <div className="text-center mt-12">
            <Button onClick={handleGenerateCharacter} variant="warm" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Another Hero
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

const HeroesPage = () => {
  return (
    <Suspense fallback={
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-8">
            My Heroes
          </Heading>
          <Spinner />
        </div>
      </Container>
    }>
      <HeroesPageContent />
    </Suspense>
  );
};

export default HeroesPage;
