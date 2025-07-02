"use client";

import React, { useState, useEffect } from 'react';
import { Search, Trophy, Medal, Award, Star, TrendingUp, User, Crown } from 'lucide-react';
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
import { formatBalance } from '@/utils/format';

interface IUser {
  _id: string;
  walletAddress: string;
  name: string;
  avatar?: string;
  balance: number;
  wins: number;
  losses: number;
  score: number;
  totalDeposits: number;
  totalWithdrawals: number;
  createdAt: Date;
  lastLogin: Date;
}

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: leaderboardData, isLoading, error, refetch } = useQuery({
    queryKey: ['leaderboard', debouncedSearchTerm],
    queryFn: async () => {
      const result = await ApiService.getInstance().getLeaderboard(debouncedSearchTerm || undefined);
      return result;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const users: IUser[] = leaderboardData?.users || [];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-text-muted" />;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "gradient";
      case 2:
        return "primary";
      case 3:
        return "warning";
      default:
        return "default";
    }
  };

  const getWinRate = (wins: number, losses: number) => {
    const total = wins + losses;
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  return (
    <Container>
      <div className="min-h-screen py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 px-4">
          <Heading level={1} variant="gradient" className="mb-3 md:mb-4 text-2xl md:text-4xl">
            🏆 Leaderboard
          </Heading>
          <Text variant="secondary" size="base" className="md:text-lg">
            Compete with the best warriors in PromptWar Arena
          </Text>
        </div>

        {/* Search */}
        <Card variant="default" className="mb-6 md:mb-8">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  type="text"
                  placeholder="Search warriors by name..."
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
            <Text variant="secondary" className="mt-2 sm:mt-0 sm:ml-3">Loading leaderboard...</Text>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card variant="default" className="text-center py-8 md:py-12 mx-4">
            <Text variant="danger" className="mb-4">Failed to load leaderboard</Text>
            <Button variant="primary" onClick={() => refetch()}>
              Try Again
            </Button>
          </Card>
        )}

        {/* Leaderboard List */}
        {!isLoading && !error && (
          <>
            {users.length === 0 ? (
              <Card variant="default" className="text-center py-8 md:py-12 mx-4">
                <User className="w-10 h-10 md:w-12 md:h-12 text-text-muted mx-auto mb-4" />
                <Heading level={3} className="mb-2 text-lg md:text-xl">
                  {searchTerm ? 'No warriors found' : 'No warriors yet'}
                </Heading>
                <Text variant="secondary" className="text-sm md:text-base px-4">
                  {searchTerm 
                    ? `No warriors match "${searchTerm}". Try a different search term.`
                    : 'Be the first to climb the leaderboard!'
                  }
                </Text>
              </Card>
            ) : (
              <div className="space-y-3 md:space-y-4 px-4 md:px-0">
                {users.map((user, index) => {
                  const rank = index + 1;
                  const winRate = getWinRate(user.wins, user.losses);
                  
                  return (
                    <Card 
                      key={user._id} 
                      variant={rank <= 3 ? "gradient" : "default"}
                      className={`overflow-hidden ${rank === 1 ? 'animate-pulse-glow' : ''}`}
                    >
                      <div className="p-4 md:p-6">
                        {/* Mobile Layout */}
                        <div className="block md:hidden">
                          {/* Top Row - Rank, Avatar, Name */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0 text-center">
                              <div className="flex flex-col items-center gap-1">
                                {getRankIcon(rank)}
                                <Badge variant={getRankBadgeVariant(rank)} size="sm">
                                  #{rank}
                                </Badge>
                              </div>
                            </div>
                            <Avatar
                              src={user.avatar}
                              alt={user.name}
                              size="md"
                              className="flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <Heading level={4} className="truncate text-sm">
                                {user.name}
                              </Heading>
                              <Text variant="secondary" size="xs" className="truncate">
                                {`${user.walletAddress.slice(0, 4)}...${user.walletAddress.slice(-4)}`}
                              </Text>
                            </div>
                          </div>

                          {/* Bottom Row - Stats Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            {/* Score */}
                            <div className="text-center bg-surface-secondary rounded-lg p-3">
                              <Text variant="default" className="font-bold text-lg mb-1">
                                {formatBalance(user.score)}
                              </Text>
                              <Text variant="secondary" size="xs">Score</Text>
                            </div>

                            {/* Win Rate */}
                            <div className="text-center bg-surface-secondary rounded-lg p-3">
                              <div className="flex gap-1 justify-center mb-1">
                                <Badge variant="success" size="sm">
                                  {user.wins}
                                </Badge>
                                <Badge variant="danger" size="sm">
                                  {user.losses}
                                </Badge>
                              </div>
                              <Text variant="secondary" size="xs">
                                {winRate}% Win Rate
                              </Text>
                            </div>

                            {/* Balance */}
                            <div className="text-center bg-surface-secondary rounded-lg p-3">
                              <Text variant="default" className="font-bold text-sm mb-1">
                                {user.balance.toFixed(3)} SOL
                              </Text>
                              <Text variant="secondary" size="xs">Balance</Text>
                            </div>

                            {/* Total Deposits */}
                            <div className="text-center bg-surface-secondary rounded-lg p-3">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <TrendingUp className="w-3 h-3 text-green-400" />
                                <Text variant="default" className="font-medium text-sm">
                                  {user.totalDeposits.toFixed(2)}
                                </Text>
                              </div>
                              <Text variant="secondary" size="xs">Deposits</Text>
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:flex items-center gap-4">
                          {/* Rank */}
                          <div className="flex-shrink-0 w-16 text-center">
                            <div className="flex flex-col items-center gap-1">
                              {getRankIcon(rank)}
                              <Badge variant={getRankBadgeVariant(rank)} size="sm">
                                #{rank}
                              </Badge>
                            </div>
                          </div>

                          {/* Avatar & Name */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <Avatar
                              src={user.avatar}
                              alt={user.name}
                              size="lg"
                              className="flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <Heading level={4} className="truncate mb-1">
                                {user.name}
                              </Heading>
                              <Text variant="secondary" size="sm" className="truncate">
                                {`${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`}
                              </Text>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex gap-6 items-center">
                            {/* Score */}
                            <div className="text-center">
                              <Text variant="default" className="font-bold text-xl mb-1">
                                {formatBalance(user.score)}
                              </Text>
                              <Text variant="secondary" size="xs">Score</Text>
                            </div>

                            {/* Wins/Losses */}
                            <div className="text-center">
                              <div className="flex gap-2 mb-1">
                                <Badge variant="success" size="sm">
                                  {formatBalance(user.wins)}W
                                </Badge>
                                <Badge variant="danger" size="sm">
                                  {formatBalance(user.losses)}L
                                </Badge>
                              </div>
                              <Text variant="secondary" size="xs">
                                {winRate}% Win Rate
                              </Text>
                            </div>

                            {/* Balance */}
                            <div className="text-center">
                              <Text variant="default" className="font-bold mb-1">
                                {user.balance.toFixed(3)} SOL
                              </Text>
                              <Text variant="secondary" size="xs">Balance</Text>
                            </div>

                            {/* Total Deposits */}
                            <div className="text-center">
                              <div className="flex items-center gap-1 mb-1">
                                <TrendingUp className="w-3 h-3 text-green-400" />
                                <Text variant="default" className="font-medium">
                                  {user.totalDeposits.toFixed(2)}
                                </Text>
                              </div>
                              <Text variant="secondary" size="xs">Total Deposits</Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Footer Stats */}
        {!isLoading && !error && users.length > 0 && (
          <Card variant="default" className="mt-6 md:mt-8 mx-4 md:mx-0">
            <div className="p-4 md:p-6 text-center">
              <Text variant="secondary" className="text-sm md:text-base">
                Showing {users.length} warrior{users.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </Text>
            </div>
          </Card>
        )}
      </div>
    </Container>
  );
} 