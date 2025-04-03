import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import mockup from "../../public/mockup.png"
import Image from "next/image";
import ThemeLink from "./ThemeLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export default function Hero(){
    const session = getServerSession(authOptions);
    return(
        <div className="bg-gradient-to-b from-[#FFDBCC] flex flex-col items-center py-8 md:py-32 px-4 md:px-16 text-slate-50  gap-6">
            <div className="flex flex-col space-y-8 items-center max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-black">
                    Inventory management software for growing businesses.
                </h2>
                <p className="text-base md:text-xl text-black">
                Increase your sales and keep track of every unit with our powerful stock management, order fulfillment, and inventory control software

                </p>
                 
                 <div className="flex py-4 space-x-4 items-center">
                    {session?  <ThemeLink 
                className="bg-rose-600 hover:bg-rose-700
                focus:ring-rose-300 text-white"
                title="View Dashboard"
                href="/dashboard/home/overview"
                icon={<AiOutlineArrowDown />}
                
                
                /> : <ThemeLink 
                className="bg-rose-600 hover:bg-rose-700
                focus:ring-rose-300 text-white"
                title="Access the Inventory System"
                href="/dashboard/home/overview"
                icon={<AiOutlineArrowDown />}
                
                
                /> }
                 
                
                <ThemeLink 
                className="bg-slate-50 hover:bg-slate-100
                focus:ring-slate-300 text-slate-900"
                title="Explore Demo account"
                href="/dashboard/home/overview"
                icon={<AiOutlineArrowDown />}
                
                
                /> 

                 </div>

            </div>
            <div className="">
                <Image src={mockup}  alt="Inventory App"/>

            </div>

        </div>
    )
}