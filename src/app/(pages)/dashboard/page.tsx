"use client";

import { useState, useEffect } from "react";
import { Card, Container, Text, Heading, Button, Badge } from "@/components/ui";
import { ApiService } from "@/lib/ApiService";
import { BattleCharacterCard } from "@/components/wedget/BattleCharacterCard";
import {
  Play,
  Eye,
  RotateCcw,
  Heart,
  Shield,
  Zap,
  Users,
  Trophy,
  Clock,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Star,
} from "lucide-react";

interface PlayfulHero {
  id: string;
  name: string;
  power: string;
  artStyle: string;
  oneLiner: string;
  video?: string;
  createdAt: string;
}

interface Adventure {
  id: string;
  winner: string;
  loser: string;
  damage: number;
  prompt: string;
  video: string;
  duration: string;
}

interface RecentAdventure {
  _id: string;
  creator: { name: string; avatar?: string };
  challenger: { name: string; avatar?: string };
  characterCreator: {
    _id: string;
    name: string;
    video: string[];
    weapons: string;
    fightingStyle: string;
    strength: number;
    speed: number;
    defense: number;
    intelligence: number;
    primaryPower: string;
  };
  characterChallenger: {
    _id: string;
    name: string;
    video: string[];
    weapons: string;
    fightingStyle: string;
    strength: number;
    speed: number;
    defense: number;
    intelligence: number;
    primaryPower: string;
  };
  winner: 'creator' | 'challenger';
  status: string;
  startedAt: string;
  finishedAt?: string;
}

export default function DashboardPage() {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentHeroes, setRecentHeroes] = useState<PlayfulHero[]>([]);
  const [recentAdventures, setRecentAdventures] = useState<Adventure[]>([]);
  const [recentChampions, setRecentChampions] = useState<RecentAdventure[]>([]);
  const [liveAdventures, setLiveAdventures] = useState<any[]>([]);
  const [voiceChatEnabled, setVoiceChatEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch random videos for live feed
        const responses = await ApiService.getInstance().getRandomVideo();
        const urls = responses.map((response: any) => {
          if (typeof response === "string") return response;
          return response?.url || "/images/landing/Green_Helmet.mp4";
        });
        setVideoUrls(urls);

        // Fetch recent adventures to get champion characters
        try {
          const recentAdventuresData = await ApiService.getInstance().getRecentBattles();
          setRecentChampions(recentAdventuresData);
        } catch (error) {
          console.error("Error fetching recent adventures:", error);
        }

        // Mock data for demo - replace with actual API calls
        setRecentHeroes([
          {
            id: "1",
            name: "Sunny Sparkle",
            power: "Rainbow Burst",
            artStyle: "Magical",
            oneLiner: "Spreading joy everywhere!",
            createdAt: "2 min ago",
          },
          {
            id: "2",
            name: "Cozy Bear",
            power: "Warm Hugs",
            artStyle: "Adorable",
            oneLiner: "Friend to all creatures",
            createdAt: "5 min ago",
          },
          {
            id: "3",
            name: "Happy Fox",
            power: "Playful Tricks",
            artStyle: "Whimsical",
            oneLiner: "Always ready for fun!",
            createdAt: "8 min ago",
          },
        ]);

        setRecentAdventures([
          {
            id: "1",
            winner: "Sunny Sparkle",
            loser: "Shadow Sneaker",
            damage: 850,
            prompt: "Magical playground adventure",
            video: urls[0] || "/images/landing/Green_Helmet.mp4",
            duration: "2:34",
          },
          {
            id: "2",
            winner: "Cozy Bear",
            loser: "Grumpy Goblin",
            damage: 920,
            prompt: "Friendship conquers all",
            video: urls[1] || "/images/landing/Green_Helmet.mp4",
            duration: "3:12",
          },
        ]);

        setLiveAdventures([
          { id: "1", status: "active", participants: 2, viewers: 45 },
          { id: "2", status: "waiting", participants: 1, viewers: 12 },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setVideoUrls(
          Array.from({ length: 5 }, () => "/images/landing/Green_Helmet.mp4")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <Text className="text-primary font-mono">Creating magical moments...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Atmospheric Warm Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating warm sparkles with cozy glow */}
        <div
          className="absolute top-1/6 left-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse opacity-70"
          style={{ animation: "sparkleFloat1 20s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-highlight/20 rounded-full blur-3xl animate-pulse opacity-60"
          style={{ animation: "sparkleFloat2 25s ease-in-out infinite reverse" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-50"
          style={{ animation: "sparkleFloat3 18s ease-in-out infinite" }}
        ></div>

        {/* Floating magical particles */}
        <div
          className="absolute top-1/5 left-1/6 w-2 h-2 bg-primary rounded-full shadow-glow animate-ping opacity-80"
          style={{ animation: "magicDrift1 12s linear infinite" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-highlight rounded-full shadow-glow-coral animate-ping opacity-70"
          style={{ animation: "magicDrift2 15s linear infinite" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-primary rounded-full shadow-glow animate-ping opacity-90"
          style={{ animation: "magicDrift3 10s linear infinite" }}
        ></div>
      </div>

      {/* Main Content */}
      <Container size="default" className="relative z-10 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Heading
              level={1}
              variant="gradient"
              className="mb-4 text-4xl md:text-6xl font-black"
            >
              COZY ADVENTURES
            </Heading>
            <Text variant="secondary" size="lg" className="font-mono">
              Live adventures • Magical heroes • Heartwarming stories
            </Text>
          </div>

          {/* 1. Live Feed Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="text-primary"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Main Live Video */}
              <div className="col-span-2">
                <Card className="overflow-hidden bg-gradient-to-br from-surface-secondary/80 to-surface-tertiary/80 border-primary/30">
                  <div className="aspect-video relative">
                    <video
                      src={videoUrls[0]}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted={!soundEnabled}
                      loop
                      playsInline
                    />
                    <div className="absolute top-4 left-4 bg-primary px-2 py-1 rounded-full text-sm font-bold animate-pulse text-white">
                      🔴 LIVE
                    </div>
                  </div>
                </Card>
              </div>

              {/* Live Stats */}
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
                <Text className="text-sm text-primary mb-3 font-bold">
                  ACTIVE ADVENTURES
                </Text>
                {liveAdventures.map((adventure) => (
                  <div key={adventure.id} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            adventure.status === "active"
                              ? "bg-primary"
                              : "bg-highlight"
                          } animate-pulse`}
                        ></div>
                        <Text size="sm">Adventure #{adventure.id}</Text>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-text-muted" />
                        <Text size="xs" variant="secondary">
                          {adventure.participants}/2
                        </Text>
                      </div>
                    </div>
                    <Text size="xs" variant="secondary">
                      {adventure.viewers} watching
                    </Text>
                  </div>
                ))}
              </Card>

              <Card className="p-4 bg-gradient-to-br from-highlight/10 to-transparent border-highlight/30 col-span-1">
                <Text className="text-sm text-highlight mb-3 font-bold">
                  COZY STATS
                </Text>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text size="sm">Total Adventures</Text>
                    <Text size="sm" className="text-primary">
                      1,847
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text size="sm">Happy Heroes</Text>
                    <Text size="sm" className="text-primary">
                      456
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text size="sm">Playing Now</Text>
                    <Text size="sm" className="text-highlight">
                      234
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 2. Recent Heroes Section */}
          <section className="mb-12">
            <Heading level={2} className="text-2xl font-bold text-primary mb-6 flex items-center">
              Recent Adventure Champions
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {recentChampions.map((adventure, index) => {
                if(index >= 4) return null;
                // Get the winner character based on adventure.winner
                const winnerCharacter = adventure.winner === 'creator' 
                  ? adventure.characterCreator 
                  : adventure.characterChallenger;
                
                // Transform to match BattleCharacterCard props
                const character: any = {
                  _id: winnerCharacter._id,
                  name: winnerCharacter.name,
                  video: winnerCharacter.video,
                  weapons: winnerCharacter.weapons,
                  fightingStyle: winnerCharacter.fightingStyle,
                  winNumber: 0,
                  loseNumber: 0,
                  // Add required defaults for ICharacter interface
                  size: "Medium",
                  bodyType: "Athletic",
                  height: "Average",
                  notableFeatures: "",
                  specialTechnique: "",
                  experience: "Veteran",
                  strength: winnerCharacter.strength,
                  speed: winnerCharacter.speed,
                  defense: winnerCharacter.defense,
                  intelligence: winnerCharacter.intelligence,
                  magicPower: 7,
                  primaryPower: "",
                  powerLimitation: "",
                  defensiveAbility: "",
                  criticalWeakness: "",
                  environmentalLimitation: "",
                  appearance: "",
                  battlePersonality: "",
                  cameraView: "Third Person",
                  taskId: "",
                  image: [],
                  prompt: "",
                  owner: "",
                  createdAt: new Date()
                };

                return (
                  <div key={adventure._id} className="space-y-3 flex flex-col items-center">
                    <BattleCharacterCard
                      character={character}
                      isWinner={true}
                    />
                    
                    {/* Champion Info */}
                    <Card className="p-3 bg-gradient-to-br from-primary/20 to-surface-secondary/80 border-primary/40 w-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Text size="sm" className="font-bold text-primary flex items-center">
                            <Trophy className="w-3 h-3 mr-1" />
                            Adventure Hero
                          </Text>
                          <Text size="xs" variant="secondary">
                            {new Date(adventure.startedAt).toLocaleDateString()}
                          </Text>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Heart className="w-3 h-3 text-text-muted" />
                            <Text size="xs" variant="secondary">Power:</Text>
                            <Text size="xs" className="text-text-primary">{winnerCharacter.weapons}</Text>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-3 h-3 text-text-muted" />
                            <Text size="xs" variant="secondary">Style:</Text>
                            <Text size="xs" className="text-text-primary">{winnerCharacter.fightingStyle}</Text>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-border-muted">
                          <Text size="xs" className="text-text-secondary">
                            Befriended: {adventure.winner === 'creator' ? adventure.characterChallenger.name : adventure.characterCreator.name}
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
              
              {/* Show loading message if no champions yet */}
              {recentChampions.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <Text variant="secondary" size="lg">No recent adventures completed yet</Text>
                  <Text variant="secondary" size="sm">Champions will appear here after adventures finish</Text>
                </div>
              )}
            </div>
          </section>

          {/* 3. Adventure Replay Carousel */}
          <section className="mb-12">
            <Heading level={2} className="text-2xl font-bold text-primary mb-6">
              Adventure Highlights
            </Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentAdventures.map((adventure) => (
                <Card
                  key={adventure.id}
                  className="overflow-hidden bg-gradient-to-br from-surface-secondary/80 to-surface-tertiary/80 border-border-muted"
                >
                  <video
                    src={adventure.video}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                </Card>
              ))}
            </div>
          </section>

          {/* 5. Project Roadmap */}
          <section className="mb-12">
            <Heading level={2} className="text-2xl font-bold text-primary mb-6">
              Cozy Adventure Roadmap
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Q1 2025 - LIVE */}
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-surface-secondary/80 border-primary/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <Text className="font-bold text-primary">
                      Q1 2025 - LIVE
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text size="sm" className="text-text-primary">Hero Creation</Text>
                    <Text size="sm" className="text-text-primary">Adventure System</Text>
                    <Text size="sm" className="text-text-primary">Live Magic Moments</Text>
                    <Text size="sm" className="text-text-primary">Friendly Competitions</Text>
                  </div>
                </div>
              </Card>

              {/* Q2 2025 - IN PROGRESS */}
              <Card className="p-6 bg-gradient-to-br from-highlight/20 to-surface-secondary/80 border-highlight/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-highlight rounded-full animate-pulse"></div>
                    <Text className="font-bold text-highlight">
                      Q2 2025 - IN PROGRESS
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text size="sm" className="text-text-secondary">Friendship Tournaments</Text>
                    <Text size="sm" className="text-text-secondary">Cozy Communities</Text>
                    <Text size="sm" className="text-text-secondary">Hero Collection Cards</Text>
                    <Text size="sm" className="text-text-secondary">Mobile Adventures</Text>
                  </div>
                </div>
              </Card>

              {/* Q3 2025 - PLANNED */}
              <Card className="p-6 bg-gradient-to-br from-accent-peach/20 to-surface-secondary/80 border-accent-peach/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent-peach rounded-full"></div>
                    <Text className="font-bold text-accent-peach">
                      Q3 2025 - PLANNED
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text size="sm" className="text-text-muted">VR Cozy Worlds</Text>
                    <Text size="sm" className="text-text-muted">AI Storyteller</Text>
                    <Text size="sm" className="text-text-muted">Multi-Realm Adventures</Text>
                    <Text size="sm" className="text-text-muted">Wholesome Gaming Integration</Text>
                  </div>
                </div>
              </Card>

              {/* Q4 2025 - VISION */}
              <Card className="p-6 bg-gradient-to-br from-accent-coral/20 to-surface-secondary/80 border-accent-coral/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent-coral rounded-full"></div>
                    <Text className="font-bold text-accent-coral">
                      Q4 2025 - VISION
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text size="sm" className="text-text-muted">Global Friendship Festival</Text>
                    <Text size="sm" className="text-text-muted">Magical Metaverse</Text>
                    <Text size="sm" className="text-text-muted">Community Governance</Text>
                    <Text size="sm" className="text-text-muted">AI Adventure Director</Text>
                  </div>
                </div>
              </Card>
            </div>

            {/* Extended Roadmap for 2026 */}
            <div className="mt-8">
              <Heading level={3} className="text-xl font-bold text-primary mb-6 text-center">
                2026 Magical Vision & Beyond
              </Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Q1-Q2 2026 */}
                <Card className="p-6 bg-gradient-to-br from-primary/15 to-surface-secondary/80 border-primary/30">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <Text className="font-bold text-primary">
                        H1 2026 - EXPANSION
                      </Text>
                    </div>
                    <div className="space-y-3">
                      <Text size="sm" className="text-text-muted">AI-Generated Heartwarming Stories</Text>
                      <Text size="sm" className="text-text-muted">Multi-Platform Streaming</Text>
                      <Text size="sm" className="text-text-muted">Real-World Friendship Events</Text>
                      <Text size="sm" className="text-text-muted">Wholesome Celebrity Partners</Text>
                    </div>
                  </div>
                </Card>

                {/* Q3-Q4 2026 */}
                <Card className="p-6 bg-gradient-to-br from-highlight/15 to-surface-secondary/80 border-highlight/30">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-highlight rounded-full"></div>
                      <Text className="font-bold text-highlight">
                        H2 2026 - FUTURE
                      </Text>
                    </div>
                    <div className="space-y-3">
                      <Text size="sm" className="text-text-muted">Neural Empathy Interface</Text>
                      <Text size="sm" className="text-text-muted">Quantum Joy Processing</Text>
                      <Text size="sm" className="text-text-muted">Holographic Cuddles</Text>
                      <Text size="sm" className="text-text-muted">Intergalactic Friendship Adventures</Text>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </Container>

      {/* CSS Animations for Warm Atmospheric Effects */}
      <style jsx>{`
        @keyframes sparkleFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          33% {
            transform: translate(100px, -50px) scale(1.2);
            opacity: 0.5;
          }
          66% {
            transform: translate(-80px, 30px) scale(0.9);
            opacity: 0.8;
          }
        }

        @keyframes sparkleFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-120px, -70px) scale(1.3);
            opacity: 0.4;
          }
        }

        @keyframes sparkleFloat3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          25% {
            transform: translate(60px, 40px) scale(1.1);
            opacity: 0.7;
          }
          75% {
            transform: translate(-90px, -20px) scale(0.8);
            opacity: 0.3;
          }
        }

        @keyframes magicDrift1 {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translate(300px, -200px) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes magicDrift2 {
          0% {
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          85% {
            opacity: 0.7;
          }
          100% {
            transform: translate(-250px, -300px) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes magicDrift3 {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.9;
          }
          100% {
            transform: translate(200px, -150px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
