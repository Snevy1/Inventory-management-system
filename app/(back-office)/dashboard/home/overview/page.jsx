


 import DashboardBanner from '@/components/dashboard/DashboardBanner'
import SalesOverview from '@/components/dashboard/SalesOverview'
import CurrentStock from '@/components/dashboard/CurrentStock'
import { getData } from '@/lib/getData';

export const dynamic = 'force-dynamic'; 

export default async function Dashboard() {
  const items = await getData("items");
  const warehouses = await getData("warehouses");
  console.log("Warehose2",warehouses )
  return (
    <div>
      <DashboardBanner />
        <SalesOverview />
        <CurrentStock title="Available Stock Items Stock" items={items} />
        {
          warehouses.map((warehouse, i)=>{
            return (
              <CurrentStock key={i} title={`Available Stock Items in ${warehouse.title}`} items={warehouse.items} />

            )
          })
        }
    </div>
  )
}
 