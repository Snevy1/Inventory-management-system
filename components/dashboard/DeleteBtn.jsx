import { Trash2 } from 'lucide-react'
import React from 'react'

export default function DeleteBtn() {
  return (
         <button className="font-medium text-red-600 dark:text-blue-500  flex items-center space-x-2">
          <Trash2 className='w-4 h-4' />
         <span>Delete</span>
        </button>
  )
}
