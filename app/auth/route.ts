import { auth } from '@/auth'

export async function GET(request: Request) {
  const session = await auth()
  if (session) {
    return new Response(null, { status: 200 })
  }
  return new Response(null, { status: 401 })
}
