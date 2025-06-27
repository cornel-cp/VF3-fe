"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Search, Trophy, Coins, User, Calendar, Play, Users, Sword, Clock, Eye } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Spinner } from '@/components/ui/Spinner';
import { ApiService } from '@/lib/ApiService';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface IBattle {
  _id: string;
  creator: {
    _id: string;
    name: string;
    avatar?: string;
  };
  challenger?: {
    _id: string;
    name: string;
    avatar?: string;
  };
  characterCreator: {
    _id: string;
    name: string;
    avatar?: string;
    attributes?: any;
  };
  characterChallenger?: {
    _id: string;
    name: string;
    avatar?: string;
    attributes?: any;
  };
  betAmount: number;
  status: 'pending' | 'finished' | 'video_generated';
  winner?: 'creator' | 'challenger';
  video?: string[];
  createdAt: string;
  updatedAt: string;
}

interface BattlesResponse {
  battles: IBattle[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const BattlesPageContent = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'finished'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const { data: battlesData, isLoading, error, refetch } = useQuery<BattlesResponse>({
    queryKey: ['battles', activeTab, debouncedSearchTerm, currentPage],
    queryFn: async () => {
      const result = await ApiService.getInstance().getBattles({
        status: activeTab,
        searchParams: debouncedSearchTerm || undefined,
        page: currentPage,
        limit: 10
      });
      return result;
    },
    refetchInterval: activeTab === 'pending' ? 5000 : undefined, // Auto-refresh pending battles
  });

  const battles: IBattle[] = battlesData?.battles || [];
  const pagination = battlesData?.pagination;

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  const handleBattleClick = (battle: IBattle) => {
    if (battle.status === 'finished') {
      router.push(`/video/${battle._id}`);
    } else {
      router.push(`/battle/${battle._id}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning" size="sm">Waiting</Badge>;
      case 'active':
        return <Badge variant="primary" size="sm">Active</Badge>;
      case 'finished':
        return <Badge variant="success" size="sm">Finished</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  return (
    <Container>
      <div className="min-h-screen py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Heading level={1} variant="gradient" className="mb-4">
            ⚔️ Battle Arena
          </Heading>
          <Text variant="secondary" size="lg">
            Join epic battles or watch legendary confrontations
          </Text>
        </div>

        {/* Tabs */}
        <Card variant="default" className="mb-6">
          <div className="p-6">
            <div className="flex gap-1 bg-surface-secondary rounded-lg p-1">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'pending'
                    ? 'bg-primary text-background shadow-md'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                Pending Battles
              </button>
              <button
                onClick={() => setActiveTab('finished')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'finished'
                    ? 'bg-primary text-background shadow-md'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Trophy className="w-4 h-4 inline mr-2" />
                Finished Battles
              </button>
            </div>
          </div>
        </Card>

        {/* Search */}
        <Card variant="default" className="mb-6">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  type="text"
                  placeholder={`Search ${activeTab} battles by player or character name...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchTerm && (
                <Button variant="outline" onClick={clearSearch} className="sm:w-auto">
                  Clear
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col sm:flex-row justify-center items-center py-8 md:py-12">
            <Spinner size="lg" />
            <Text variant="secondary" className="mt-2 sm:mt-0 sm:ml-3">
              Loading {activeTab} battles...
            </Text>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card variant="default" className="text-center py-8 md:py-12 mx-4">
            <Text variant="danger" className="mb-4">Failed to load battles</Text>
            <Button variant="primary" onClick={() => refetch()}>
              Try Again
            </Button>
          </Card>
        )}

        {/* Battles List */}
        {!isLoading && !error && (
          <>
            {battles.length === 0 ? (
              <Card variant="default" className="text-center py-8 md:py-12 mx-4">
                <Sword className="w-10 h-10 md:w-12 md:h-12 text-text-muted mx-auto mb-4" />
                <Heading level={3} className="mb-2 text-lg md:text-xl">
                  {searchTerm ? `No ${activeTab} battles found` : `No ${activeTab} battles yet`}
                </Heading>
                <Text variant="secondary" className="text-sm md:text-base px-4">
                  {searchTerm 
                    ? `No ${activeTab} battles match "${searchTerm}". Try a different search term.`
                    : activeTab === 'pending'
                      ? 'No battles are currently waiting for challengers. Create your first battle!'
                      : 'No battles have been completed yet. Be part of the first epic confrontation!'
                  }
                </Text>
                {!searchTerm && (
                  <Button 
                    variant="gradient" 
                    className="mt-6"
                    onClick={() => router.push('/battle')}
                  >
                    Create Battle
                  </Button>
                )}
              </Card>
            ) : (
              <div className="space-y-4 px-4 md:px-0">
                {battles.map((battle) => (
                  <div 
                    key={battle._id}
                    className="cursor-pointer"
                    onClick={() => handleBattleClick(battle)}
                  >
                    <Card 
                      variant="default"
                      className="overflow-hidden hover:ring-2 hover:ring-primary/30 transition-all"
                    >
                    <div className="p-4 md:p-6">
                                             {activeTab === 'pending' ? (
                         // Pending Battle Layout
                         <>
                           {/* Mobile Layout */}
                           <div className="block md:hidden">
                             <div className="flex items-center gap-3 mb-4">
                               <Avatar
                                 src={battle.creator.avatar}
                                 alt={battle.creator.name}
                                 size="sm"
                                 className="flex-shrink-0"
                               />
                               <div className="min-w-0 flex-1">
                                 <Text variant="default" className="font-medium truncate text-sm">
                                   {battle.creator.name}
                                 </Text>
                                 <div className="flex items-center gap-1">
                                   <Text variant="secondary" size="xs">with</Text>
                                   <Text variant="default" className="font-semibold text-primary text-sm">
                                     {battle.characterCreator.name}
                                   </Text>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                 <div className="text-center">
                                   <div className="flex items-center gap-1 mb-1">
                                     <Coins className="w-3 h-3 text-primary" />
                                     <Text variant="default" className="font-bold text-sm">
                                       {battle.betAmount} SOL
                                     </Text>
                                   </div>
                                   <Text variant="secondary" size="xs">Bet</Text>
                                 </div>
                                 
                                 <div className="text-center">
                                   {getStatusBadge(battle.status)}
                                   <Text variant="secondary" size="xs" className="mt-1">
                                     {formatDate(battle.createdAt)}
                                   </Text>
                                 </div>
                               </div>
                               
                               <Button variant="gradient" size="sm">
                                 <Users className="w-3 h-3 mr-1" />
                                 Join
                               </Button>
                             </div>
                           </div>

                           {/* Desktop Layout */}
                           <div className="hidden md:flex items-center gap-4">
                             {/* Creator Info */}
                             <div className="flex items-center gap-3 flex-1 min-w-0">
                               <Avatar
                                 src={battle.creator.avatar}
                                 alt={battle.creator.name}
                                 size="md"
                                 className="flex-shrink-0"
                               />
                               <div className="min-w-0 flex-1">
                                 <Text variant="default" className="font-medium truncate">
                                   {battle.creator.name}
                                 </Text>
                                 <div className="flex items-center gap-1">
                                   <Text variant="secondary" size="sm">with</Text>
                                   <Text variant="default" className="font-semibold text-primary">
                                     {battle.characterCreator.name}
                                   </Text>
                                 </div>
                               </div>
                             </div>

                             {/* Battle Info */}
                             <div className="flex items-center gap-4 flex-shrink-0">
                               <div className="text-center">
                                 <div className="flex items-center gap-1 mb-1">
                                   <Coins className="w-4 h-4 text-primary" />
                                   <Text variant="default" className="font-bold">
                                     {battle.betAmount} SOL
                                   </Text>
                                 </div>
                                 <Text variant="secondary" size="xs">Bet Amount</Text>
                               </div>

                               <div className="text-center">
                                 {getStatusBadge(battle.status)}
                                 <Text variant="secondary" size="xs" className="mt-1">
                                   {formatDate(battle.createdAt)}
                                 </Text>
                               </div>

                               <Button variant="gradient" size="sm">
                                 <Users className="w-4 h-4 mr-1" />
                                 Join
                               </Button>
                             </div>
                           </div>
                         </>
                      ) : (
                        // Finished Battle Layout
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Video Preview */}
                          <div className="relative aspect-video md:w-48 flex-shrink-0 bg-surface-secondary rounded-lg overflow-hidden">
                            {battle.video && battle.video.length > 0 ? (
                              <video
                                src={battle.video[0]}
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Play className="w-8 h-8 text-text-muted" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <div className="bg-primary/90 rounded-full p-3">
                                <Play className="w-6 h-6 text-background" />
                              </div>
                            </div>
                          </div>

                          {/* Battle Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <Text variant="default" className="font-medium mb-1">
                                  Epic Battle Results
                                </Text>
                                <Text variant="secondary" size="sm">
                                  {formatDate(battle.createdAt)}
                                </Text>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(battle.status)}
                                <div className="flex items-center gap-1">
                                  <Coins className="w-3 h-3 text-primary" />
                                  <Text variant="default" size="sm" className="font-medium">
                                    {battle.betAmount} SOL
                                  </Text>
                                </div>
                              </div>
                            </div>

                            {/* Fighters */}
                            <div className="flex items-center gap-4">
                              {/* Creator */}
                              <div className={`flex items-center gap-2 flex-1 ${battle.winner === 'creator' ? 'text-primary' : 'text-text-secondary'}`}>
                                <Avatar
                                  src={battle.creator.avatar}
                                  alt={battle.creator.name}
                                  size="sm"
                                />
                                <div className="min-w-0 flex-1">
                                  <Text variant={battle.winner === 'creator' ? 'default' : 'secondary'} size="sm" className="truncate">
                                    {battle.creator.name}
                                  </Text>
                                  <Text variant="secondary" size="xs" className="truncate">
                                    {battle.characterCreator.name}
                                  </Text>
                                </div>
                                {battle.winner === 'creator' && (
                                  <Trophy className="w-4 h-4 text-primary" />
                                )}
                              </div>

                              <Text variant="secondary" size="lg" className="font-bold">VS</Text>

                              {/* Challenger */}
                              <div className={`flex items-center gap-2 flex-1 ${battle.winner === 'challenger' ? 'text-primary' : 'text-text-secondary'}`}>
                                {battle.winner === 'challenger' && (
                                  <Trophy className="w-4 h-4 text-primary" />
                                )}
                                <div className="min-w-0 flex-1 text-right">
                                  <Text variant={battle.winner === 'challenger' ? 'default' : 'secondary'} size="sm" className="truncate">
                                    {battle.challenger?.name || 'Unknown'}
                                  </Text>
                                  <Text variant="secondary" size="xs" className="truncate">
                                    {battle.characterChallenger?.name || 'Unknown'}
                                  </Text>
                                </div>
                                <Avatar
                                  src={battle.challenger?.avatar}
                                  alt={battle.challenger?.name || 'Unknown'}
                                  size="sm"
                                />
                              </div>
                            </div>

                            <div className="mt-3 flex justify-end">
                              <Button variant="gradient" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                Watch Battle
                              </Button>
                            </div>
                          </div>
                        </div>
                                             )}
                     </div>
                   </Card>
                  </div>
                 ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Card variant="default" className="mt-6 mx-4 md:mx-0">
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-center">
                    <Text variant="secondary" className="text-sm">
                      Page {pagination.currentPage} of {pagination.totalPages} 
                      ({pagination.total} total battles)
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

const BattlesPage = () => {
  return (
    <Suspense fallback={
      <Container size="lg" className="py-8">
        <div className="text-center">
          <Heading level={1} variant="gradient" className="mb-8">
            ⚔️ Battle Arena
          </Heading>
          <Spinner />
        </div>
      </Container>
    }>
      <BattlesPageContent />
    </Suspense>
  );
};

export default BattlesPage;
