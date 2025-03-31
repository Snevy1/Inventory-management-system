
import CreateItemForm from '@/components/dashboard/CreateItemForm'
import FormHeader from '@/components/dashboard/FormHeader'
import { getData } from '@/lib/getData';
export default async  function NewItem({initialData={}, isUpdate=false}) {


  const categoriesData =  getData("categories");
  const unitsData = getData("units");
  const brandsData = getData("brands");
  const warehousesData =  getData("warehouses");
  const suppliersData = getData("suppliers");

  const [categories, units,brands,warehouses,suppliers] = await Promise.all([categoriesData,unitsData,brandsData,warehousesData,
    suppliersData
   ])

  //Parallel Fetching is faster; none blocking


  const selectOptions = [
    {
      label: "Main",
      value: "main"
    },
    {
      label: "Branch",
      value: "branch"
    }
  ]


  return (
    <div>
        {/* Header */}
        <FormHeader title={isUpdate ? "Update Item": "New Item"} href="/dashboard/inventory/items" />
        {/* Form */}
           <CreateItemForm initialData={initialData} isUpdate={isUpdate} categories={categories} units={units} brands={brands} warehouses={warehouses} suppliers={suppliers}/>

    </div>
  )
}
