'use client';

import { useState } from 'react';
import { 
  Card, 
  Button, 
  ProgressBar, 
  Heading, 
  Text, 
  Badge, 
  Input, 
  Avatar, 
  Container 
} from '@/component/ui';
import { 
  Bell, 
  Settings, 
  Search, 
  Plus, 
  Heart,
  TrendingUp,
  Users,
  Activity,
  Zap,
  Terminal,
  Code
} from 'lucide-react';

export default function HomePage() {
  const [progress, setProgress] = useState(91);
  const [conversionValue, setConversionValue] = useState(537);

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="border-b border-surface-tertiary bg-surface-primary/80 backdrop-blur-lg sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hover:text-primary hover:shadow-glow">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary hover:shadow-glow">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-highlight hover:shadow-glow-teal">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            
            <Button variant="primary" className="rounded-full p-3 animate-pulse-glow">
              <Plus className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hover:text-primary hover:shadow-glow">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary hover:shadow-glow">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tab Navigation Card */}
            <Card className="p-4 glass border-glow">
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm" className="flex items-center space-x-2 bg-primary text-background glow">
                  <Terminal className="w-4 h-4" />
                  <Text size="sm" className="text-background">Active</Text>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-primary">
                  <Code className="w-4 h-4" />
                  <Text size="sm">Code</Text>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-highlight">
                  <Zap className="w-4 h-4" />
                  <Text size="sm">Power</Text>
                </Button>
              </div>
            </Card>

            {/* Progress Card */}
            <Card className="p-6 border-glow animate-pulse-glow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text size="lg" className="font-medium text-gradient-cyber">Choose a number</Text>
                  <Badge variant="primary" className="bg-primary text-background px-3 py-1 glow animate-flicker">
                    {progress}%
                  </Badge>
                </div>
                <ProgressBar 
                  value={progress} 
                  variant="gradient" 
                  size="lg" 
                  animated
                  className="relative shadow-glow"
                />
                <div className="flex items-center justify-between mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                    className="border border-primary/30 hover:border-primary hover:glow"
                  >
                    -10
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                    className="border border-primary/30 hover:border-primary hover:glow"
                  >
                    +10
                  </Button>
                </div>
              </div>
            </Card>

            {/* Settings Card */}
            <Card className="p-6 glass-teal">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Button variant="secondary" size="sm" className="rounded-full p-2 bg-highlight text-background glow-teal">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Text className="font-medium">Neural Network</Text>
                  <div className="ml-auto w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-surface-elevated">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Text className="font-medium">Data Stream</Text>
                  <div className="ml-auto w-3 h-3 rounded-full bg-highlight animate-pulse"></div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-surface-elevated">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Text className="font-medium">Query Engine</Text>
                  <div className="ml-auto w-3 h-3 rounded-full bg-accent-gray animate-pulse"></div>
                </div>
              </div>
            </Card>

            {/* User Profile Card */}
            <Card className="p-4 border-glow-teal">
              <div className="flex items-center space-x-3">
                <Avatar 
                  size="md" 
                  fallback="U"
                  online={true}
                  className="ring-2 ring-highlight/50 glow-teal"
                />
                <div>
                  <Text className="font-medium text-primary">User_001</Text>
                  <Text size="sm" variant="secondary">Neural Interface Active</Text>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Top Navigation */}
            <Card className="p-4 glass">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <div className="w-6 h-1 bg-primary rounded-full animate-pulse"></div>
                </Button>
                <Button variant="primary" className="rounded-full p-3 glow-lg animate-pulse-glow">
                  <Plus className="w-5 h-5" />
                </Button>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="hover:text-primary">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:text-primary">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:text-highlight">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Page Title Card */}
            <Card className="p-6 border-glow">
              <div className="flex items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-1 bg-gradient-cyber rounded-full animate-gradient"></div>
                  <Heading level={3} className="font-bold text-gradient-cyber">PromptClash Dashboard</Heading>
                </div>
              </div>
            </Card>

            {/* Conversion Stats Card */}
            <Card className="p-6 border-glow animate-pulse-glow" variant="elevated">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text variant="secondary" size="sm">Neural Processing</Text>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Heading level={1} className="text-4xl font-bold text-gradient-cyber animate-flicker">
                    {conversionValue}
                  </Heading>
                  <Text variant="success" size="sm" className="flex items-center space-x-1 text-primary">
                    <span>+22% efficiency boost</span>
                  </Text>
                </div>
                
                <div className="mt-6">
                  <div className="w-full h-16 bg-surface-secondary rounded-lg relative overflow-hidden border border-primary/20">
                    <svg className="w-full h-full" viewBox="0 0 200 60">
                      <path 
                        d="M0,30 Q50,10 100,25 T200,20" 
                        stroke="rgba(182, 255, 76, 0.8)" 
                        strokeWidth="2" 
                        fill="none"
                        className="animate-pulse drop-shadow-glow"
                      />
                      <path 
                        d="M0,35 Q50,15 100,30 T200,25" 
                        stroke="rgba(212, 255, 130, 0.6)" 
                        strokeWidth="1" 
                        fill="none"
                        className="animate-pulse delay-500"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Second Conversion Card */}
            <Card className="p-6 glass-teal border-glow-teal" variant="glass">
              <div className="space-y-4">
                <Text variant="secondary" size="sm">Cyber Performance</Text>
                
                <div className="space-y-2">
                  <Heading level={1} className="text-4xl font-bold text-gradient-teal">
                    {conversionValue}
                  </Heading>
                  <Text variant="success" size="sm" className="text-highlight">
                    +22% quantum leap
                  </Text>
                </div>
                
                <div className="mt-6">
                  <div className="w-full h-16 bg-surface-secondary rounded-lg relative overflow-hidden border border-highlight/20">
                    <svg className="w-full h-full" viewBox="0 0 200 60">
                      <path 
                        d="M0,40 Q50,20 100,35 T200,30" 
                        stroke="rgba(0, 255, 195, 0.8)" 
                        strokeWidth="2" 
                        fill="none"
                        className="animate-pulse drop-shadow-glow-teal"
                      />
                      <path 
                        d="M0,45 Q50,25 100,40 T200,35" 
                        stroke="rgba(0, 204, 156, 0.6)" 
                        strokeWidth="1" 
                        fill="none"
                        className="animate-pulse delay-300"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-radial-teal opacity-30"></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Action Button */}
            <div className="flex justify-end">
              <Button variant="primary" className="rounded-full p-4 glow-2xl animate-pulse-glow">
                <Plus className="w-6 h-6" />
              </Button>
            </div>

            {/* Content Cards */}
            <Card className="p-0 overflow-hidden border-glow">
              <div className="h-48 bg-gradient-cyber relative">
                <div className="absolute inset-0 bg-gradient-mesh animate-gradient"></div>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="sm" className="bg-background/20 backdrop-blur-sm border border-primary/30 glow">
                    <Heart className="w-4 h-4 text-primary" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-highlight animate-pulse delay-200"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-primary">
                <Heading level={3} className="mb-2 text-gradient-cyber">Neural Interface</Heading>
                <Text variant="secondary">Advanced AI processing node with quantum entanglement</Text>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden border-glow-teal">
              <div className="h-48 bg-gradient-to-br from-highlight via-primary to-background relative">
                <div className="absolute inset-0 bg-gradient-radial-teal animate-gradient"></div>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="sm" className="bg-background/20 backdrop-blur-sm border border-highlight/30 glow-teal">
                    <Zap className="w-4 h-4 text-highlight" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex space-x-1">
                    <div className="w-1 h-8 bg-highlight animate-pulse"></div>
                    <div className="w-1 h-6 bg-highlight animate-pulse delay-100"></div>
                    <div className="w-1 h-10 bg-highlight animate-pulse delay-200"></div>
                    <div className="w-1 h-4 bg-highlight animate-pulse delay-300"></div>
                    <div className="w-1 h-7 bg-highlight animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-primary">
                <Heading level={3} className="mb-2 text-gradient-teal">Cyber Terminal</Heading>
                <Text variant="secondary">Real-time data stream visualization matrix</Text>
              </div>
            </Card>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="mt-12 space-y-8">
          <Card className="p-8 border-glow bg-gradient-cyber">
            <Heading level={2} className="mb-6 text-gradient-cyber text-center animate-flicker">
              Interactive Cyber Console
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Text className="font-medium text-primary">Control Panel</Text>
                <div className="space-y-2">
                  <Button variant="primary" className="w-full glow">Neural Link</Button>
                  <Button variant="secondary" className="w-full bg-highlight text-background glow-teal">Cyber Mode</Button>
                  <Button variant="gradient" className="w-full glow-lg animate-pulse-glow">Quantum Boost</Button>
                  <Button variant="outline" className="w-full border-primary hover:glow">Debug Mode</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <Text className="font-medium text-primary">Status Indicators</Text>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary" className="glow">Online</Badge>
                  <Badge variant="success" className="bg-highlight text-background glow-teal">Active</Badge>
                  <Badge variant="warning" className="bg-primary text-background animate-flicker">Processing</Badge>
                  <Badge variant="danger" className="border border-primary">Offline</Badge>
                  <Badge variant="gradient" className="glow-lg">Quantum</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Text className="font-medium text-primary">Performance Metrics</Text>
                <div className="space-y-3">
                  <ProgressBar value={75} variant="primary" showValue className="glow" />
                  <ProgressBar value={60} variant="gradient" showValue className="glow-teal" />
                  <ProgressBar value={90} variant="success" showValue className="border border-highlight" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <Text className="font-medium text-primary">Neural Input Interface</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Enter neural command..." 
                  variant="default"
                  className="input-glow border-primary bg-surface-primary text-primary placeholder:text-text-tertiary"
                />
                <Input 
                  placeholder="Cyber terminal access..." 
                  variant="filled"
                  type="text"
                  className="input-glow-teal border-highlight bg-surface-primary text-highlight placeholder:text-text-tertiary"
                />
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}