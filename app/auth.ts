import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import prisma from "./lib/prisma";
import GoogleProvider from 'next-auth/providers/google'

export const config = {
    pages: {
        signIn: "/login"
    },
    adapter: MongoDBAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async session({session,token}) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.picture;
                session.user.username = token.username;
                
            }

            return session
        },

        async jwt({jwt, user}) {
            const prismaUser = await prisma.
        }
    }


} satisfies NextAuthOptions