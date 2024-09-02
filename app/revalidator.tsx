'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Login } from './login'

export function Revalidator({ children }: PropsWithChildren) {
  const [needsRefresh, setNeedsRefresh] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isFirstMount = useRef(true)

  const refresh = useCallback(async () => {
    const { ok } = await fetch('/auth')
    if (ok) {
      setNeedsRefresh(false)
    } else {
      setNeedsRefresh(true)
    }
  }, [])

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    refresh()
  }, [pathname, refresh, router])

  useEffect(() => {
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [refresh])

  return (
    <>
      {needsRefresh && (
        <div className="fixed w-screen h-screen bg-black/20 grid place-items-center backdrop-blur-sm">
          <Login onLogin={() => setNeedsRefresh(false)} />
        </div>
      )}

      {children}
    </>
  )
}
