"use client"

import React from 'react'
import CollapsibleLink from './CollapsibleLink'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { BaggageClaim } from 'lucide-react'

export default function SidebarDropDownLink({title, items, icon}) {
    const Icon = icon;
  return (
    <Collapsible >
    <CollapsibleTrigger className='p-2 flex items-center space-x-2'>
    <Icon  className='w-4 h-4' />
                  <span>
                      {title}
                  </span></CollapsibleTrigger>
    <CollapsibleContent>
                      {
                        items.map((item, index)=>{
                          return (
                            <CollapsibleLink key={index} title={item.title} href={item.href} />
                          )
                        })
                      }
  
  
  
                      
    </CollapsibleContent>
  </Collapsible>
  )
}
