
import React from 'react'
import SalesActivityCard from './SalesActivityCard'
import InventoryCard from './InventoryCard'

export default function SalesOverview() {

    

    const inventorySummary = [
        {
            title: "Quantity in Hand",
            number: 10
        },
        {
            title: "Quantity to be Received",
            number: 0
        }
        
    ]


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
