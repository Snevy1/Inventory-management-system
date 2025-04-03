import React from 'react'
import { getData } from '@/lib/getData';
import NewItem from '@/components/dashboard/NewItem';
export const dynamic = 'force-dynamic'; 

export default async function Page() {

    const data = {};
  return (

        <NewItem initialData={data} isUpdate={false}/>
  )
}
