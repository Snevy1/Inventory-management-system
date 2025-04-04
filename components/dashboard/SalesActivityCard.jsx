import React from 'react'
import Link from 'next/link'
import { Check, CheckCircle2 } from 'lucide-react'
import { getData } from '@/lib/getData';

export default async function SalesActivityCard() {

    const categoriesData =  getData("categories");
      const itemsData = getData("items");
      const warehousesData =  getData("warehouses");
      const suppliersData = getData("suppliers");
    
      const [categories,items,warehouses,suppliers] = await Promise.all([categoriesData, itemsData,warehousesData,
        suppliersData
       ])
    




    const salesActivity = [
        {
            title: "Categories",
            number: categories.length,
            unit: "Qty",
            href:"/dashboard/inventory/categories",
            color:"text-blue-600"
        },
        {
            title: "Items",
            number: items.length,
            unit: "Pkgs",
            href:"/dashboard/inventory/items",
            color:"text-red-600"
        },
        {
            title: "Warehouses",
            number: warehouses.length,
            unit: "Qty",
            href:"/dashboard/inventory/warehouse",
            color:"text-green-600"
        },
        {
            title: "Suppliers",
            number: suppliers.length,
            unit: "Qty",
            href:"/dashboard/inventory/suppliers",
            color:"text-orange-600"
        },
    ]
  return (
    
        <div className="col-span-full lg:col-span-8 border-r border-slate-300 p-8 py-16 lg:py-8">
            <h2 className='mb-6 text-xl'>Sales Activity</h2>
            <div className=" pr-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Card */}

                {
                    salesActivity.map((item, i)=>{
                        return(

                    <Link href={item.href} key={i} className="shadow rounded border border-x-slate-200 hover:border-blue-400 p-8
                 bg-white cursor-pointer flex items-center flex-col gap-3 transition-all duration-300 px-3 py-4">
                    <h4 className={`font-semibold ${item.color} text-3xl`}>{item.number}</h4>
                    {/* <small className='text-slate-500'>{item.unit}</small> */}
                    <div className="flex items-center space-x-2 text-slate-500">
                        <CheckCircle2 className='w-4 h-4' />
                        <span className='uppercase font-xs'>{item.title}</span>
                    </div>

                </Link>

                        )
                    })
                }
                
            </div>

        </div>
    
  )
}
