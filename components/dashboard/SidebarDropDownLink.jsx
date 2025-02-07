"use client"

import React from 'react'
import CollapsibleLink from './CollapsibleLink'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { BaggageClaim, ChevronRight } from 'lucide-react'

export default function SidebarDropDownLink({title, items, icon:Icon}) {
  return (
    <Collapsible >
    <CollapsibleTrigger className='flex justify-between items-center w-full '>
          <div className="p-2 flex items-center space-x-2">
          <Icon  className='w-4 h-4' />
                  <span>
                      {title}
                  </span>
          </div>

          <ChevronRight className='w-4 h-4' />

                  </CollapsibleTrigger>
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
