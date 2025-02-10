"use client"

import { BaggageClaim, BarChart4, Cable, ChevronLeft, Files, Home, PlusCircle, ShoppingBag, ShoppingBasket, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import SubscriptionCard from './SubscriptionCard'



import SidebarDropDownLink from './SidebarDropDownLink'


export default function Sidebar() {

  const inventoryLinks = [
    {
      title:"Items",
      href: "/dashboard/inventory"
    },
    {
      title:"Categories",
      href: "/dashboard/inventory"
    },
    {
      title:"Brands",
      href: "/dashboard/inventory"
    },
    {
      title:"Units",
      href: "/dashboard/inventory"
    },
    {
      title:"Warehouse",
      href: "/dashboard/inventory"
    },
    {
      title:"Inventory Adjustment",
      href: "#"
    }
  ]
  const salesLinks = [
    {
      title:"Customers",
      href: "#"
    },
    {
      title:"Sales Orders",
      href: "#"
    },
    {
      title:"Packages",
      href: "#"
    },
    {
      title:"Shipment",
      href: "#"
    },
    {
      title:"Invoices",
      href: "#"
    },
    {
      title:"Sales Receipts",
      href: "#"
    },
    {
      title:"Payment Received",
      href: "#"
    },
    {
      title:"Sales Returns",
      href: "#"
    },
    {
      title:"Credit notes",
      href: "#"
    }
  ]


  return (
    <div className='w-60 min-h-screen bg-slate-800 text-slate-50  fixed'>
              {/* Top part */}

              <div className="flex flex-col">
                {/* 
              Logo */}
              <Link href="#" className="flex space-x-2 items-center bg-slate-950 py-3 px-2">
                <ShoppingCart />
                <span className='font-semibold text-xl'>Inventory</span>
              </Link>

              {/* Links */}

              <nav className='flex flex-col gap-3 px-3 py-6'>
                <Link href="#" className='p-2 flex items-center space-x-2 bg-blue-600 text-slate-50   rounded-md '>
                <Home className='w-4 h-4' />
                <span>
                    Home
                </span>
                </Link>


                <SidebarDropDownLink  items={inventoryLinks} title="Inventory"  icon={BaggageClaim}/>
                <SidebarDropDownLink  items={salesLinks} title="Sales"  icon={ShoppingBasket}/>
                <button  className='flex items-center space-x-2 p-2'>
                <ShoppingBag  className='w-4 h-4' />
                <span>
                    Purchases
                </span>
                </button>

                <Link href=" " className='flex items-center space-x-2 p-2'>
                <Cable className='w-4 h-4' />
                <span>
                    Integrations
                </span>
                </Link>
                <Link href=" " className='flex items-center space-x-2 p-2'>
                <BarChart4 className='w-4 h-4' />
                <span>
                    Reports
                </span>
                </Link>
                <Link href=" " className='flex items-center space-x-2 p-2'>
                <Files className='w-4 h-4' />
                <span>
                    Documents
                </span>
                </Link>
              </nav>

              <SubscriptionCard />



              </div>



              {/* Bottom part */}

              <div className="flex flex-col">
              <div className="flex space-x-2 items-center bg-slate-950 py-3 px-2 justify-center">
                <ChevronLeft />
              </div>
              </div>

              {/* Subscription Card */}

              {/* Footer Icon */}
    
            </div>
  )
}
