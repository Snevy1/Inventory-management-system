"use client"

import AddInventoryForm from '@/components/dashboard/AddInventoryForm'
import FormHeader from '@/components/dashboard/FormHeader'
import TransferInventoryForm from '@/components/dashboard/TransferInventoryForm'
import { Minus, Plus } from 'lucide-react'

import React, { useState } from 'react'

export default function AdjustmentForm({items,warehouses, suppliers}) {

    const tabs = [
        {
            title: 'Add Stock',
            icon: Plus,
            form: "add"
        }, 
        {
            title: 'Transfer Stock',
            icon: Minus,
            form: "transfer"
        }
    ]

    const  [activeForm, setActiveForm] = useState("add")



  return (
    <div>
        {/* Header */}
        <FormHeader title="New Adjustment" href="/dashboard/inventory/adjustments" />

        
          

        

<div className="border-b border-gray-200 dark:border-gray-700
w-full max-w-4xl px-4 py-2 bg-white border  shadow rounded mx-auto my-3

">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {
            tabs.map((tab,i)=>{
                const Icon = tab.icon
                return  (
                    <li className="me-2" key={i}>
            <button onClick={()=> setActiveForm(tab.form)}  className={`${
                activeForm === tab.form ?"inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group": 
                "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"}`} aria-current="page">
              <Icon className='text-gray-400 group-hover:text-gray-500 dark:text-gray-500 ' /> {tab.title}
            </button>
        </li>

                )
            })
        }


        <li></li>

        
       
    </ul>
</div>

        {/* Form */}
        {activeForm === "add" ? 
                    <AddInventoryForm items={items} warehouses={warehouses} suppliers={suppliers}/>

        : 
            <TransferInventoryForm items={items} warehouses={warehouses} />

        }



    </div>
  )
}
