import { useQuery } from "@tanstack/react-query"

import { ApiService } from "@/lib/ApiService"

export const useCharacter = (characterId: string) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['character', characterId],
        queryFn: async () => {
            const response = await ApiService.getInstance().getCharacterById(characterId)
            return response
        },
        enabled: !!characterId
    })

    return {data, isLoading, error}
}