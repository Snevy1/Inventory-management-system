import React from 'react'

export default function InventoryCard({item, index}) {
  return (
    <div>
        <div key={index} className=" mb-4 shadow rounded border border-x-slate-200 hover:border-blue-400 px-4 py-2
                 bg-white cursor-pointer flex items-center justify-between gap-3 transition-all duration-300">
                  <h2 className='uppercase text-slate-500 text-sm'>{item.title}</h2>
                  <h4 className=' text-2xl'>{item.number}</h4>

                 </div>
    </div>
  )
}
