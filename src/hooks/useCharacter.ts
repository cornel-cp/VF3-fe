import { useQuery } from "@tanstack/react-query"

import { ApiService } from "@/lib/ApiService"

export const useCharacter = (characterId: string, enableInterval: boolean = false) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['character', characterId],
        queryFn: async () => {
            const response = await ApiService.getInstance().getCharacterById(characterId)
            return response
        },
        enabled: !!characterId,
        refetchInterval: enableInterval ? 40000 : false
    })

    return {data, isLoading, error}
}