// app/users/page.tsx
'use client'

import { useUserCreate } from '@/hooks/users/use-user-create'

export default function UsersPage() {
  const { mutate, isPending } = useUserCreate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    mutate({ name, email })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' />
      </div>
      <button type='submit' disabled={isPending}>
        Create User
      </button>
    </form>
  )
}
