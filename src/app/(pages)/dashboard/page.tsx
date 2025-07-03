"use client";

import { useState, useEffect } from "react";
import { Card, Container, Text, Heading, Button, Badge } from "@/components/ui";
import { ApiService } from "@/lib/ApiService";
import { BattleCharacterCard } from "@/components/wedget/BattleCharacterCard";
import {
  Play,
  Eye,
  RotateCcw,
  Sword,
  Shield,
  Zap,
  Users,
  Trophy,
  Clock,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";

interface Champion {
  id: string;
  name: string;
  weapon: string;
  artStyle: string;
  oneLiner: string;
  video?: string;
  createdAt: string;
}

interface Battle {
  id: string;
  winner: string;
  loser: string;
  damage: number;
  prompt: string;
  video: string;
  duration: string;
}

interface RecentBattle {
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
  const [recentChampions, setRecentChampions] = useState<Champion[]>([]);
  const [recentBattles, setRecentBattles] = useState<Battle[]>([]);
  const [recentWinners, setRecentWinners] = useState<RecentBattle[]>([]);
  const [liveBattles, setLiveBattles] = useState<any[]>([]);
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

        // Fetch recent battles to get winner characters
        try {
          const recentBattlesData = await ApiService.getInstance().getRecentBattles();
          setRecentWinners(recentBattlesData);
        } catch (error) {
          console.error("Error fetching recent battles:", error);
        }

        // Mock data for demo - replace with actual API calls
        setRecentChampions([
          {
            id: "1",
            name: "Cyber Samurai",
            weapon: "Plasma Katana",
            artStyle: "Cyberpunk",
            oneLiner: "Honor in the digital realm",
            createdAt: "2 min ago",
          },
          {
            id: "2",
            name: "Neon Knight",
            weapon: "Light Saber",
            artStyle: "Sci-Fi",
            oneLiner: "Guardian of the future",
            createdAt: "5 min ago",
          },
          {
            id: "3",
            name: "Tech Warrior",
            weapon: "Quantum Rifle",
            artStyle: "Military",
            oneLiner: "Precision through technology",
            createdAt: "8 min ago",
          },
        ]);

        setRecentBattles([
          {
            id: "1",
            winner: "Cyber Samurai",
            loser: "Shadow Ninja",
            damage: 850,
            prompt: "Epic duel in neon city",
            video: urls[0] || "/images/landing/Green_Helmet.mp4",
            duration: "2:34",
          },
          {
            id: "2",
            winner: "Neon Knight",
            loser: "Dark Mage",
            damage: 920,
            prompt: "Light vs darkness clash",
            video: urls[1] || "/images/landing/Green_Helmet.mp4",
            duration: "3:12",
          },
        ]);

        setLiveBattles([
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
      <div className="h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <Text className="text-primary font-mono">Loading War Zone...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Atmospheric Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Moving fog clouds with cyber glow */}
        <div
          className="absolute top-1/6 left-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse opacity-70"
          style={{ animation: "fogFloat1 20s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-highlight/20 rounded-full blur-3xl animate-pulse opacity-60"
          style={{ animation: "fogFloat2 25s ease-in-out infinite reverse" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-50"
          style={{ animation: "fogFloat3 18s ease-in-out infinite" }}
        ></div>

        {/* Floating particles */}
        <div
          className="absolute top-1/5 left-1/6 w-2 h-2 bg-primary rounded-full shadow-glow animate-ping opacity-80"
          style={{ animation: "particleDrift1 12s linear infinite" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-highlight rounded-full shadow-glow-cyan animate-ping opacity-70"
          style={{ animation: "particleDrift2 15s linear infinite" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-primary rounded-full shadow-glow animate-ping opacity-90"
          style={{ animation: "particleDrift3 10s linear infinite" }}
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
              WAR ZONE
            </Heading>
            <Text variant="secondary" size="lg" className="font-mono">
              Live battles • Champion forge • Epic replays
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
                <Card className="overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-primary/30">
                  <div className="aspect-video relative">
                    <video
                      src={videoUrls[0]}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted={!soundEnabled}
                      loop
                      playsInline
                    />
                    <div className="absolute top-4 left-4 bg-red-600 px-1 py-1 rounded-full text-sm font-bold animate-pulse" />
                  </div>
                </Card>
              </div>

              {/* Live Stats */}
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
                <Text className="text-sm text-primary mb-3 font-bold">
                  ACTIVE BATTLES
                </Text>
                {liveBattles.map((battle) => (
                  <div key={battle.id} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            battle.status === "active"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                          } animate-pulse`}
                        ></div>
                        <Text size="sm">Battle #{battle.id}</Text>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <Text size="xs" variant="secondary">
                          {battle.participants}/2
                        </Text>
                      </div>
                    </div>
                    <Text size="xs" variant="secondary">
                      {battle.viewers} viewers
                    </Text>
                  </div>
                ))}
              </Card>

              <Card className="p-4 bg-gradient-to-br from-highlight/10 to-transparent border-highlight/30 col-span-1">
                <Text className="text-sm text-highlight mb-3 font-bold">
                  WAR ZONE STATS
                </Text>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text size="sm">Total Battles</Text>
                    <Text size="sm" className="text-primary">
                      1,847
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text size="sm">Champions</Text>
                    <Text size="sm" className="text-primary">
                      456
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text size="sm">Online Now</Text>
                    <Text size="sm" className="text-green-400">
                      234
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 2. Recent Champions Section */}
          <section className="mb-12">
            <Heading level={2} className="text-2xl font-bold text-primary mb-6 flex items-center">
              Recent Battle Winners
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {recentWinners.map((battle, index) => {
                if(index >= 4) return null;
                // Get the winner character based on battle.winner
                const winnerCharacter = battle.winner === 'creator' 
                  ? battle.characterCreator 
                  : battle.characterChallenger;
                
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
                  <div key={battle._id} className="space-y-3 flex flex-col items-center">
                    <BattleCharacterCard
                      character={character}
                      isWinner={true}
                    />
                    
                    {/* Winner Info */}
                    <Card className="p-3 bg-gradient-to-br from-yellow-900/30 to-gray-900/80 border-yellow-500/30 w-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Text size="sm" className="font-bold text-yellow-400 flex items-center">
                            <Trophy className="w-3 h-3 mr-1" />
                            Champion
                          </Text>
                          <Text size="xs" variant="secondary">
                            {new Date(battle.startedAt).toLocaleDateString()}
                          </Text>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Sword className="w-3 h-3 text-gray-400" />
                            <Text size="xs" variant="secondary">Weapon:</Text>
                            <Text size="xs" className="text-white">{winnerCharacter.weapons}</Text>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Zap className="w-3 h-3 text-gray-400" />
                            <Text size="xs" variant="secondary">Style:</Text>
                            <Text size="xs" className="text-white">{winnerCharacter.fightingStyle}</Text>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-700">
                          <Text size="xs" className="text-gray-300">
                            Defeated: {battle.winner === 'creator' ? battle.characterChallenger.name : battle.characterCreator.name}
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
              
              {/* Show loading message if no winners yet */}
              {recentWinners.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <Text variant="secondary" size="lg">No recent battles completed yet</Text>
                  <Text variant="secondary" size="sm">Winners will appear here after battles finish</Text>
                </div>
              )}
            </div>
          </section>

          {/* 3. Battle Replay Carousel */}
          <section className="mb-12">
            <Heading level={2} className="text-2xl font-bold text-primary mb-6">
              Battle Replay
            </Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentBattles.map((battle) => (
                <Card
                  key={battle.id}
                  className="overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700"
                >
                  <video
                    src={battle.video}
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
              Project Roadmap
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Q1 2025 - LIVE */}
              <Card className="p-6 bg-gradient-to-br from-green-900/30 to-gray-900/80 border-green-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <Text className="font-bold text-green-400">
                      Q1 2025 - LIVE
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text size="sm" className="text-white">Champion Creation</Text>
                    <Text size="sm" className="text-white">Battle System</Text>
                    <Text size="sm" className="text-white">Live Video Generation</Text>
                    <Text size="sm" className="text-white">Side Betting</Text>
                  </div>
                </div>
              </Card>

              {/* Q2 2025 - IN PROGRESS */}
              <Card className="p-6 bg-gradient-to-br from-yellow-900/30 to-gray-900/80 border-yellow-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <Text className="font-bold text-yellow-400">
                      Q2 2025 - IN PROGRESS
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text size="sm" className="text-gray-300">Tournament Mode</Text>
                    <Text size="sm" className="text-gray-300">Guild System</Text>
                    <Text size="sm" className="text-gray-300">NFT Integration</Text>
                    <Text size="sm" className="text-gray-300">Mobile App</Text>
                  </div>
                </div>
              </Card>

              {/* Q3 2025 - PLANNED */}
              <Card className="p-6 bg-gradient-to-br from-blue-900/30 to-gray-900/80 border-blue-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <Text className="font-bold text-blue-400">
                      Q3 2025 - PLANNED
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text size="sm" className="text-gray-400">VR Battle Mode</Text>
                    <Text size="sm" className="text-gray-400">AI Commentator</Text>
                    <Text size="sm" className="text-gray-400">Cross-chain Support</Text>
                    <Text size="sm" className="text-gray-400">Esports Integration</Text>
                  </div>
                </div>
              </Card>

              {/* Q4 2025 - VISION */}
              <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-gray-900/80 border-purple-500/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <Text className="font-bold text-purple-400">
                      Q4 2025 - VISION
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text size="sm" className="text-gray-400">Global Championships</Text>
                    <Text size="sm" className="text-gray-400">Metaverse Integration</Text>
                    <Text size="sm" className="text-gray-400">DAO Governance</Text>
                    <Text size="sm" className="text-gray-400">AI Battle Director</Text>
                  </div>
                </div>
              </Card>
            </div>

            {/* Extended Roadmap for 2026 */}
            <div className="mt-8">
              <Heading level={3} className="text-xl font-bold text-primary mb-6 text-center">
                2026 Vision & Beyond
              </Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Q1-Q2 2026 */}
                <Card className="p-6 bg-gradient-to-br from-cyan-900/30 to-gray-900/80 border-cyan-500/50">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                      <Text className="font-bold text-cyan-400">
                        H1 2026 - EXPANSION
                      </Text>
                    </div>
                    <div className="space-y-3">
                      <Text size="sm" className="text-gray-400">AI-Generated Storylines</Text>
                      <Text size="sm" className="text-gray-400">Multi-Platform Streaming</Text>
                      <Text size="sm" className="text-gray-400">Real-World Events</Text>
                      <Text size="sm" className="text-gray-400">Celebrity Partnerships</Text>
                    </div>
                  </div>
                </Card>

                {/* Q3-Q4 2026 */}
                <Card className="p-6 bg-gradient-to-br from-pink-900/30 to-gray-900/80 border-pink-500/50">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                      <Text className="font-bold text-pink-400">
                        H2 2026 - FUTURE
                      </Text>
                    </div>
                    <div className="space-y-3">
                      <Text size="sm" className="text-gray-400">Neural Interface Integration</Text>
                      <Text size="sm" className="text-gray-400">Quantum Battle Processing</Text>
                      <Text size="sm" className="text-gray-400">Holographic Viewing</Text>
                      <Text size="sm" className="text-gray-400">Interplanetary Tournaments</Text>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </Container>

      {/* CSS Animations for Atmospheric Effects */}
      <style jsx>{`
        @keyframes fogFloat1 {
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

        @keyframes fogFloat2 {
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

        @keyframes fogFloat3 {
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

        @keyframes particleDrift1 {
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

        @keyframes particleDrift2 {
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

        @keyframes particleDrift3 {
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
