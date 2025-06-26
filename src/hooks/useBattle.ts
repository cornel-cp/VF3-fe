import { ApiService } from "@/lib/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useBattle = (battleId: string) => {
    const {data: battle, isLoading, error} = useQuery({
        queryKey: ['battle', battleId],
        queryFn: async () => {
            const result = await ApiService.getInstance().getBattleById(battleId);
            console.log('Raw battle API response:', result);
            return result;
        },
        enabled: !!battleId,
        refetchInterval: 3000
    })

    const joinBattle = async (characterId: string) => {
        const response = await ApiService.getInstance().joinBattle(battleId, characterId)
        console.log(response)
        return response
    }

    return {battle, isLoading, error, joinBattle}
}