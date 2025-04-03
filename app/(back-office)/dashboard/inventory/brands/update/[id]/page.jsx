import React from 'react'
import NewBrand from '../../new/page'
import { getData } from '@/lib/getData';
export const dynamic = 'force-dynamic'; 

export default async function Update({params:{id}}) {

    const data = await getData(`brands/${id}`);
    console.log(data);

  return (

        <NewBrand initialData={data} isUpdate={true}/>
  )
}
