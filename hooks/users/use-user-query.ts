import { client } from '@/lib/api-client'
import { useQuery } from '@tanstack/react-query'

export function useUserQuery() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await (
        await client.api.users.$get({ query: { name: 'test' } })
      ).json()

      return data
    },
  })
}
