import DashboardBanner from '@/components/dashboard/DashboardBanner'
import SalesOverview from '@/components/dashboard/SalesOverview'
import CurrentStock from '@/components/dashboard/CurrentStock'
import { getData } from '@/lib/getData';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  try {
    const [items, warehouses] = await Promise.all([
      getData("items"),
      getData("warehouses")
    ]);

    console.log("Items:", items);
    console.log("Warehouses:", warehouses);

    // Add validation
    if (!Array.isArray(warehouses)) {
      throw new Error('Warehouses data is not an array');
    }

    return (
      <div>
        <DashboardBanner />
        <SalesOverview />
        <CurrentStock title="Available Stock Items Stock" items={items || []} />
        
        {/* Safe mapping with additional checks */}
        {Array.isArray(warehouses) && warehouses.map((warehouse) => {
          if (!warehouse || !warehouse.id) return null;
          
          return (
            <CurrentStock 
              key={warehouse.id}
              title={`Available Stock Items in ${warehouse.title || 'Unknown Warehouse'}`}
              items={Array.isArray(warehouse.items) ? warehouse.items : []}
            />
          );
        })}
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="p-4">
        <DashboardBanner />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">Error loading dashboard</h2>
          <p>{error.message}</p>
          <p>Please try refreshing the page or contact support.</p>
        </div>
      </div>
    );
  }
}


/* import DashboardBanner from '@/components/dashboard/DashboardBanner'
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
 */