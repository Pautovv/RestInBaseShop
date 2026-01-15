import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt'; 

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await prisma.user.findFirst({
                    where: { email: credentials.email },
                });
                
                if (!user) return null;
                if (!(await compare(credentials.password, user.password))) return null;

                if (!user.verified) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.fullName,
                    role: user.role,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === 'credentials') return true;

                if (!user.email) return false;

                let dbUser = await prisma.user.findFirst({
                    where: { email: user.email },
                });

                if (dbUser) {
                    await prisma.user.update({
                        where: { id: dbUser.id },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });
                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || 'User' + user.id,
                        password: hashSync(user.id.toString(), 10), 
                        verified: new Date(),
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                        role: 'USER',
                    },
                });

                return true;
            } catch (error) {
                console.error('Error [SIGNIN]', error);
                return false;
            }
        },
        async jwt({ token }) {
            if (!token.email) return token;

            const dbUser = await prisma.user.findFirst({
                where: { email: token.email },
            });

            if (dbUser) {
                token.id = String(dbUser.id);
                token.email = dbUser.email;
                token.fullName = dbUser.fullName;
                token.role = dbUser.role;
            }

            return token;
        },
        session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
};