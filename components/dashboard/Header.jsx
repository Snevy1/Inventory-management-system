"use client"

import { AlignJustify, Bell, ChevronDown, History, LayoutGrid, Plus, Settings, User2, Users } from 'lucide-react'
import React from 'react'
import SearchInput from './SearchInput'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react';
import { generateInitials } from '@/lib/generateInitials'
import Login from '@/app/login/page'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Header({setShowSidebar}) {

  const {data: session, status} = useSession();


  if(status === 'loading'){
    return <p>Loading User...</p>
  }

  if(status === 'unauthenticated'){
    return <Login />

  }
  const username =  session?.user?.name.split(' ')[0]??"";

  const initials = generateInitials(session?.user?.name);



  
  return (
    <div className='bg-gray-100 h-12 flex items-center justify-between px-8
    border-b border-slate-200 
    
    '>

      <button className='lg:hidden' onClick={()=>setShowSidebar(true)}>
        <AlignJustify className='h-6 w-6' />
      </button>
          <div className="flex gap-3">
            {/* Recent Activities */}
            <button className='hidden lg:block'>
                <History className='w-6 h-6'/>
            </button>
           {/*  Search */}

           <SearchInput />
          </div>
          <div className=" items-center gap-3 hidden lg:flex">
            {/* Plus Icon */}

<div className="pr-2 border-r border-gray-300 space-x-2">
<button className='p-1 bg-blue-500 rounded-lg'>
                <Plus className='text-slate-50 w-4 h-4 ' />
              </button>
</div>

<div className="flex border-r border-gray-300">
<button className='p-1 hover:bg-slate-200 rounded-lg'>
                <Users className='text-slate-900 w-4 h-4 ' />
              </button>
<button className='p-1 hover:bg-slate-200 rounded-lg'>
                <Bell className='text-slate-900 w-4 h-4 ' />
              </button>
<button className='p-1 hover:bg-slate-200 rounded-lg'>
                <Settings className='text-slate-900 w-4 h-4 ' />
              </button>
</div>
            {/* Organization */}

            <div className="flex gap-3">
      <DropdownMenu>
  <DropdownMenuTrigger>
  <button className='flex items-center'>
                <span>{username}</span>
                <ChevronDown className='w-4 h-4' />
        </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
    <DropdownMenuItem>
    <button onClick={()=>signOut()}>Logout</button>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

              
              <button>
                {
                  session.user?.image ? (<Image 
                
                    src="/img-profile.jpg"
                    alt='User Image' width={96} height={96} className='rounded-full w-8 h-8 border border-slate-800'/>):(
                      <div
                      className='rounded-full w-8 h-8 border border-slate-800 bg-white'

                      >{initials}</div>
                    )
                }
                
              </button>
              <button>
                
            <LayoutGrid  className='w-6 h-6 text-slate-900'/>
              </button>

            </div>
            {/* Plus Icon */}

          </div>
          <button className='lg:hidden'>
                <Image 
                
                src="/img-profile.jpg"
                alt='User Image' width={96} height={96} className='rounded-full w-8 h-8 border border-slate-800'/>
              </button>
    </div>
  )
}
