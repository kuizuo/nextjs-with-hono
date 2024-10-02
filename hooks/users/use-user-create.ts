import { client } from '@/lib/api-client'
import { InferRequestType, InferResponseType } from 'hono/client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
const $post = client.api.users.$post

type BodyType = InferRequestType<typeof $post>['json']

type ResponseType = InferResponseType<typeof $post>['data']

export const useUserCreate = () => {
  return useMutation<ResponseType, Error, BodyType>({
    mutationKey: ['create-user'],
    mutationFn: async (json) => {
      const { data } = await (await $post({ json })).json()

      return data
    },
    onSuccess: (data) => {
      toast.success('User created successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
