import React from 'react'
import { getData } from '@/lib/getData';
import NewWareHouse from '../../new/page';

export const dynamic = 'force-dynamic'; 

export default async function Update({params:{id}}) {

    const data = await getData(`warehouses/${id}`);
    console.log(data);

  return (

        <NewWareHouse initialData={data} isUpdate={true}/>
  )
}
