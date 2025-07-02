import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/ApiService';

interface SideBetData {
  creator: {
    total: number;
    count: number;
  };
  challenger: {
    total: number;
    count: number;
  };
}

export const useSideBet = (battleId: string | null, hasChallenger: boolean = false) => {
  // Use React Query for fetching side bet data
  const { data: sideBets, isLoading, error, refetch } = useQuery({
    queryKey: ['sideBets', battleId],
    queryFn: async () => {
      if (!battleId || !hasChallenger) {
        return { creator: { total: 0, count: 0 }, challenger: { total: 0, count: 0 } };
      }
      const res =  await ApiService.getInstance().getSideBet(battleId);
      const createBetTotal = res.creatorBet.reduce((acc: number, curr: any) => acc + curr.amount, 0);
      const challengerBetTotal = res.challengerBet.reduce((acc: number, curr: any) => acc + curr.amount, 0);
      return {
        creator: { total: createBetTotal, count: res.creatorBet.length },
        challenger: { total: challengerBetTotal, count: res.challengerBet.length }
      };
    },
    refetchInterval: 4000, // 4 second refetch interval
    enabled: !!(battleId && hasChallenger), // Only fetch when battleId exists and has challenger
    initialData: { creator: { total: 0, count: 0 }, challenger: { total: 0, count: 0 } }
  });

  // Place a side bet
  const placeSideBet = async (side: 'creator' | 'challenger', amount: number) => {
    if (!battleId) {
      throw new Error('Battle ID is required');
    }
    
    try {
      await ApiService.getInstance().placeSideBet(battleId, side, amount);
      // Refetch side bets data after placing bet
      await refetch();
    } catch (err) {
      console.error('Failed to place side bet:', err);
      throw err;
    }
  };

  return {
    sideBets: sideBets || { creator: { total: 0, count: 0 }, challenger: { total: 0, count: 0 } },
    isLoading,
    error,
    placeSideBet,
    refreshSideBets: refetch
  };
};
