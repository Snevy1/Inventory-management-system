
import React from 'react'
import SalesActivityCard from './SalesActivityCard'
import InventoryCard from './InventoryCard'
import { getData } from '@/lib/getData'
import { title } from 'process';

export default async function SalesOverview() {

    const warehouses = await getData('warehouses');

    const inventorySummary  = warehouses.map((item, i)=>{
        return {
            title: item.title,
            number: item.stockQty
        }
    });

    

    


  return (
    <div className='bg-blue-50 border-b border-slate-300  grid grid-cols-12 gap-4'>
        {/* SALES ACTIVITY */}
        <SalesActivityCard />
        {/* INVENTORY SUMMARY */}
        <div className="col-span-full lg:col-span-4 p-8">
        <h2 className='mb-6 text-xl'>Inventory Summary</h2>
        <div className="">
            {
                inventorySummary.map((item, i)=>{
                    return ( 
                     <InventoryCard item={item} index={i}/>
                    )
                })
            }
        </div>

        </div>
    </div>
  )
}
