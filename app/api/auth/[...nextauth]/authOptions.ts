import GoogleProvider from 'next-auth/providers/google';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import {NextAuthOptions} from 'next-auth';

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        session: async ({session, token}) => {
            if (session?.user) {
                if (token.sub) {
                    session.user.id = token.sub;
                }
            }
            return session;
        },
        jwt: async ({user, token}) => {
            if (user) {
                token.sub = user.id;
            }
            return token
        }
    }
};

export default authOptions;