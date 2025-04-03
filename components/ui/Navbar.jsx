"use client"

import Link from "next/link";
import {BiMenu} from "react-icons/bi"
import {AiOutlineClose} from "react-icons/ai";
import { useState } from "react";
import { signOut,useSession } from "next-auth/react";
import { generateInitials } from "@/lib/generateInitials";
import ThemeLink from "./ThemeLink";

export default function Navbar(){
    const {data: session, status} = useSession();
    console.log(session);

    const [show,setShow] = useState(false);

    if(status === "loading"){
        return <loading />
    }

    console.log(status);

    const fullname = session?.user?.name ?? "John Doe"

    const initials = generateInitials(fullname);


    return(
        <>

        <header className="bg-slate-900 fixed top-0 right-0 w-full left-0 h-16 flex items-center justify-between px-16 text-slate-50 z-50">
           <Link className="font-bold text-2xl md:text-4xl" href="/">
           Inventory
           </Link>

           <nav className="hidden sm:flex items-center gap-3">
            <Link href="/">Features</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Free Tools</Link>
           </nav>

           {status === "authenticated" ? (
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-4">
                    <div className="relative inline-flex items-center justify-center  w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                            {initials}

                        </span>

                    </div>
                    <div className="font-medium dark:text-white">
                        <div>
                            {session.user.name}
                        </div>
                        <div className="text-sm text-slate-50 dark:text-slate-400">
                            {session.user.email}

                        </div>

                    </div>

                </div>

                <button onClick={()=>signOut()
                } 
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center mr-2 mb-2"
                
                >Logout</button>

            </div>
           ):(
            <div className="hidden sm:flex items-center gap-4">
                <Link href="/login">Login</Link>
                <ThemeLink
                className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-300"
                title="Register"
                href="/register"
                
                
                />

            </div>
           )}
            {/* Humberg menu */}
            <button onClick={()=>setShow(true)} className="sm:hidden">
                <BiMenu className="text-3xl" />
            </button>
        </header>

        <div className={show ? "sm:hidden fixed w-36 bg-slate-800 bg-opacity-90 h-screen right-0 z-50 top-0 p-4 text-slate-50":
            "hidden sm:hidden fixed w-36 bg-slate-800 bg-opacity-90 h-screen right-0 z-50 top-0 p-4 text-slate-50"
        }>
            <div className="flex justify-between items-center mb-10">
                <h2 className="font-bold">Inventory</h2>
                <button onClick={()=>setShow(false)}>
                    <AiOutlineClose className="text-2xl" />

                </button>

            </div>
            <nav className="flex flex-col items-start gap-3 mb-10">
                <Link href="/">Features</Link>
                <Link href="/">Pricing</Link>
                <Link href="/">Free Tools</Link>

            </nav>
            <div className="flex flex-col items-start gap-4">
                <Link href="/login">Login</Link>

                 <ThemeLink

                className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-300"
                title="Register"
                href="/register"
                
                /> 

            </div>

        </div>
        </>
    )

}