
import AdjustmentForm from '@/components/dashboard/AdjustmentForm'
import { getData } from '@/lib/getData'
export const dynamic = 'force-dynamic'; 

export default async function NewAdjustment() {
    const itemsData =  getData("items");
    const warehousesData =  getData("warehouses");
    const suppliersData = getData("suppliers");


    const [items, warehouses,suppliers] = await Promise.all([itemsData,warehousesData,suppliersData])

    
    
    

  return (
    <AdjustmentForm items={items} warehouses={warehouses} suppliers={suppliers}/>
  )
}
