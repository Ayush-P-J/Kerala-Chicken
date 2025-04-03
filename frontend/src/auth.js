import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

export const {handlers,auth} = NextAuth({
    providers:[
        CredentialsProvider({
            credentials: {
                email: { type: 'email', placeholder: 'email' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                try {

                    console.log(credentials)

                    const { email, password } = credentials

                    if (email === 'admin@gmail.com' && password === 'admin') {
                        return {
                            id: '1',
                            role: 'admin',
                            email: 'admin@gmail.com',
                        }
                    }
                    return null
                } catch (error) {
                    throw new Error('Something Went Wrong')
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    role: token.role,
                    email: token.email,
                }
            }
            return session
        }
    }
})