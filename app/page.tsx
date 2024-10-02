'use client'

import { client } from '@/lib/api-client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
      const data = await (await client.api.hello.$get()).json()
      
      setMessage(data.message)
        
      } catch (error) {
        console.error(error)
        debugger
      }

    }
    fetchData()
  }, [])

  if (!message) return <p>Loading...</p>

  return <p>{message}</p>
}
