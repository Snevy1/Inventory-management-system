import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter";
import db from "./db";
import {compare} from "bcrypt";
;

const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt"
    },
    pages:{
        signIn: "/login"
    },

    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email: { label: "Email", type: "email", placeholder: "snevy"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials){
                try {
                    // check if user credentials are correct

                    if(!credentials?.email || !credentials?.password){
                        console.log("Not Inputs");
                        return null;
                    }

                    // check if user exists

                    const existingUser = await db.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });

                    if(!existingUser){
                        console.log("No user found!");

                        return;
                    }
                    
                } catch (error) {
                    
                }
            }

        })
    ]

}

export {authOptions}