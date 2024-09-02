'use client'
import { useTransition } from 'react'

import { useRouter } from 'next/navigation'
import { login } from './actions'

type Props = {
  onLogin?: () => unknown
}

export const Login = ({ onLogin }: Props) => {
  const [, startTransition] = useTransition()
  const router = useRouter()

  return (
    <>
      <form
        noValidate
        className="flex flex-col max-w-sm space-y-4 p-4 bg-gray-50 rounded-lg shadow-2xl"
        action={async (formData: FormData) => {
          try {
            await login(formData)
            startTransition(router.refresh)
            onLogin?.()
          } catch {}
          // refresh page after login to reflect auth state
        }}
      >
        <input
          name="email"
          type="email"
          className="border px-2 py-1 rounded"
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          className="border px-2 py-1 rounded"
          placeholder="Password"
        />

        <button className="bg-gray-200 rounded px-2 py-1">Sign In</button>
      </form>
    </>
  )
}
