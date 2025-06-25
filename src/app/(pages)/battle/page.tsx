"use client";
import React, { useState, useEffect } from 'react';
import { Zap, Star, Users, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Badge } from '@/components/ui/Badge';

interface Character {
  id: number;
  name: string;
  level: number;
  element: string;
  image: string;
  description: string;
}

interface CharacterCardProps {
  character: Character;
  side: 'left' | 'right';
  isWinner: 'left' | 'right' | null;
}

const AICharacterBattle = () => {
  const [battleStarted, setBattleStarted] = useState(false);
  const [winner, setWinner] = useState<'left' | 'right' | null>(null);

  const [leftCharacter] = useState<Character>({
    id: 1,
    name: "Cyber Sentinel",
    level: 42,
    element: "Electric",
    image: "",
    description: "A cybernetic guardian with lightning-fast reflexes and electromagnetic abilities."
  });

  const [rightCharacter] = useState<Character>({
    id: 2,
    name: "Neon Phantom",
    level: 38,
    element: "Shadow",
    image: "",
    description: "A mysterious entity that manipulates shadows and moves like liquid darkness."
  });

  const startBattle = () => {
    setBattleStarted(true);
    setTimeout(() => {
      const randomWinner: 'left' | 'right' = Math.random() > 0.5 ? 'left' : 'right';
      setWinner(randomWinner);
    }, 3000);
  };

  const resetBattle = () => {
    setBattleStarted(false);
    setWinner(null);
  };

  const CharacterCard = ({ character, side, isWinner }: CharacterCardProps) => (
    <Card 
      variant={isWinner === side ? "gradient" : "default"}
      className={`w-full max-w-md ${isWinner === side ? 'animate-pulse-glow' : ''} 
        ${winner && winner !== side ? 'opacity-50' : ''}`}
    >
      {/* Character Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl">
        <Image 
          src={character.image || '/placeholder.jpg'} 
          alt={character.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Character Info */}
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Heading level={3} variant="gradient">{character.name}</Heading>
            <Badge variant="primary" size="lg">
              <Star className="w-4 h-4 mr-1" />
              {character.level}
            </Badge>
          </div>

          <Badge variant="cyber" size="md" className="w-full justify-center">
            <Zap className="w-4 h-4 mr-1" />
            {character.element} Type
          </Badge>

          <Text variant="secondary" className="text-sm">
            {character.description}
          </Text>
        </div>
      </div>
    </Card>
  );

  return (
    <Container size="lg" className="py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <Heading level={1} variant="gradient" className="flex items-center justify-center gap-4">
          AI BATTLE ARENA
        </Heading>
        <Text variant="secondary" size="lg" className="mt-2">
          Where Artificial Intelligence Meets Combat
        </Text>
      </div>

      {/* Battle Area */}
      <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
        <CharacterCard 
          character={leftCharacter} 
          side="left" 
          isWinner={winner}
        />

        {/* Battle Controls */}
        <div className="flex flex-col items-center gap-6">
          <Text variant="gradient" size="2xl" className="font-bold">VS</Text>
          
          {!battleStarted && !winner && (
            <Button
              variant="gradient"
              size="lg"
              glow
              onClick={startBattle}
              className="animate-pulse-glow"
            >
              <Zap className="w-5 h-5 mr-2" />
              START BATTLE
            </Button>
          )}

          {battleStarted && !winner && (
            <div className="text-center">
              <Text variant="default" size="lg" className="mb-4">BATTLE IN PROGRESS</Text>
              <div className="flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            </div>
          )}

          {winner && (
            <div className="text-center space-y-4">
              <Badge variant="gradient" size="lg">
                {winner === 'left' ? leftCharacter.name : rightCharacter.name} WINS!
              </Badge>
              <Button
                variant="secondary"
                size="lg"
                onClick={resetBattle}
              >
                <Users className="w-5 h-5 mr-2" />
                NEW BATTLE
              </Button>
            </div>
          )}
        </div>

        <CharacterCard 
          character={rightCharacter} 
          side="right" 
          isWinner={winner}
        />
      </div>
    </Container>
  );
};

export default AICharacterBattle;