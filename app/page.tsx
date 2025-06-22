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
  Activity
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
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            
            <Button variant="primary" glow className="rounded-full p-3">
              <Plus className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
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
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <Text size="sm">Tab</Text>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <Text size="sm">Tab</Text>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <Text size="sm">Tab</Text>
                </Button>
              </div>
            </Card>

            {/* Progress Card */}
            <Card className="p-6" glow>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text size="lg" className="font-medium">Choose a number</Text>
                  <Badge variant="primary" className="bg-primary-600 text-white px-3 py-1">
                    {progress}%
                  </Badge>
                </div>
                <ProgressBar 
                  value={progress} 
                  variant="gradient" 
                  size="lg" 
                  animated
                  className="relative"
                />
                <div className="flex items-center justify-between mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10
                  </Button>
                </div>
              </div>
            </Card>

            {/* Settings Card */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Button variant="secondary" size="sm" className="rounded-full p-2">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Text className="font-medium">Subtitle 1</Text>
                  <div className="ml-auto w-3 h-3 rounded-full bg-surface-elevated"></div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="rounded-full p-2">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Text className="font-medium">Subtitle 1</Text>
                  <div className="ml-auto w-3 h-3 rounded-full bg-surface-elevated"></div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="rounded-full p-2">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Text className="font-medium">Subtitle 1</Text>
                  <div className="ml-auto w-3 h-3 rounded-full bg-surface-elevated"></div>
                </div>
              </div>
            </Card>

            {/* User Profile Card */}
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar 
                  size="md" 
                  src="https://github.com/shadcn.png"
                  fallback="U"
                  online={true}
                  className="ring-2 ring-primary-600/20"
                />
              </div>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Top Navigation */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <div className="w-6 h-1 bg-text-secondary rounded-full"></div>
                </Button>
                <Button variant="primary" className="rounded-full p-3" glow>
                  <Plus className="w-5 h-5" />
                </Button>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Page Title Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-1 bg-text-secondary rounded-full"></div>
                  <Heading level={3} className="font-bold">Page title</Heading>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Conversion Stats Card */}
            <Card className="p-6" variant="elevated">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text variant="secondary" size="sm">Conversion</Text>
                  <Button variant="ghost" size="sm">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Heading level={1} className="text-4xl font-bold">
                    {conversionValue}
                  </Heading>
                  <Text variant="success" size="sm" className="flex items-center space-x-1">
                    <span>+22% of target</span>
                  </Text>
                </div>
                
                <div className="mt-6">
                  <div className="w-full h-16 bg-surface-secondary rounded-lg relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 200 60">
                      <path 
                        d="M0,30 Q50,10 100,25 T200,20" 
                        stroke="rgba(132, 61, 255, 0.6)" 
                        strokeWidth="2" 
                        fill="none"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>

            {/* Second Conversion Card */}
            <Card className="p-6" variant="glass">
              <div className="space-y-4">
                <Text variant="secondary" size="sm">Conversion</Text>
                
                <div className="space-y-2">
                  <Heading level={1} className="text-4xl font-bold">
                    {conversionValue}
                  </Heading>
                  <Text variant="success" size="sm">
                    +22% of target
                  </Text>
                </div>
                
                <div className="mt-6">
                  <div className="w-full h-16 bg-surface-secondary rounded-lg relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 200 60">
                      <path 
                        d="M0,40 Q50,20 100,35 T200,30" 
                        stroke="rgba(255, 64, 129, 0.6)" 
                        strokeWidth="2" 
                        fill="none"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Action Button */}
            <div className="flex justify-end">
              <Button variant="primary" className="rounded-full p-4" glow>
                <Plus className="w-6 h-6" />
              </Button>
            </div>

            {/* Content Cards */}
            <Card className="p-0 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-accent-pink via-primary-600 to-accent-cyan relative">
                <div className="absolute inset-0 bg-gradient-mesh"></div>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="sm" className="bg-white/10 backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <Heading level={3} className="mb-2">Headline</Heading>
                <Text variant="secondary">This is body</Text>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-accent-cyan via-primary-600 to-accent-orange relative">
                <div className="absolute inset-0 bg-gradient-radial"></div>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="sm" className="bg-white/10 backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <Heading level={3} className="mb-2">Headline</Heading>
                <Text variant="secondary">This is body</Text>
              </div>
            </Card>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="mt-12 space-y-8">
          <Card className="p-8">
            <Heading level={2} variant="gradient" className="mb-6">
              Interactive Demo
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Text className="font-medium">Buttons</Text>
                <div className="space-y-2">
                  <Button variant="primary" className="w-full">Primary</Button>
                  <Button variant="secondary" className="w-full">Secondary</Button>
                  <Button variant="gradient" className="w-full" glow>Gradient</Button>
                  <Button variant="outline" className="w-full">Outline</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <Text className="font-medium">Badges</Text>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="gradient">Gradient</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Text className="font-medium">Progress Bars</Text>
                <div className="space-y-3">
                  <ProgressBar value={75} variant="primary" showValue />
                  <ProgressBar value={60} variant="gradient" showValue />
                  <ProgressBar value={90} variant="success" showValue />
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <Text className="font-medium">Form Controls</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Enter your name" 
                  variant="default"
                  className="input-glow"
                  inputSize="md"
                />
                <Input 
                  placeholder="Enter your email" 
                  variant="filled"
                  type="email"
                  inputSize="md"
                />
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}