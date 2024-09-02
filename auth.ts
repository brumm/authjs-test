import NextAuth, { AuthError } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    maxAge: 5,
  },
  cookies: {
    sessionToken: { name: 'session' },
    callbackUrl: { name: 'callback-url' },
    csrfToken: { name: 'csrf-token' },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        if (
          credentials.email === 'asd@asd.asd' &&
          credentials.password === 'asd'
        ) {
          user = {
            id: '123',
            email: credentials.email,
          }
        }

        if (!user) {
          throw new AuthError('User not found.')
        }

        return user
      },
    }),
  ],
})
