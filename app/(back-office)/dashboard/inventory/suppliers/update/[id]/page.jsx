import React from 'react'
import { getData } from '@/lib/getData';
import NewSupplier from '../../new/page';

export const dynamic = 'force-dynamic'; 

export default async function Update({params:{id}}) {

    const data = await getData(`suppliers/${id}`);
    console.log(data);

  return (

        <NewSupplier initialData={data} isUpdate={true}/>
  )
}
