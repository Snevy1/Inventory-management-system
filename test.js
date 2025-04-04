import db from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";

export  async function POST(request){
    
    try {
    const {transferStockQty, itemId,givingWarehouseId,receivingWarehouseId,referenceNumber, notes} = await request.json();


    const fetchedItem = await db.item.findUnique({
        where:{
            id: itemId
        }
     });



        
// the Giving Warehouse


const givingWarehouse = await db.warehouse.findUnique({
    where:{
        id: givingWarehouseId
    }
 });

 // Get current stock

 const currentGivingWarehouseStock = givingWarehouse.stockQty;





    
 
     if(parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty)){
        //Adjust stock

         // Check if the item already exists in the warehouse

 const existingGivingItemIndex = givingWarehouse.items.findIndex(
    (item) => item.title === fetchedItem.title
  );

  givingWarehouse.items[existingGivingItemIndex].quantity -= transferStockQty;

      const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);

      //Update stock
 
      const updatedGivingWarehouse = await db.warehouse.update({
         where:{
             id: givingWarehouseId
         },
         data:{
             stockQty: newStockForGivingWarehouse,
             //items: item
         }
      });





      // Get the receiving warehouse

    const receivingWarehouse = await db.warehouse.findUnique({
        where:{
            id: receivingWarehouseId
        }
     });


      // Check if the item already exists in the warehouse

 const existingReceivingItemIndex = receivingWarehouse.items.findIndex(
    (item) => item.title === fetchedItem.title
  );

  if (existingReceivingItemIndex !== -1) {
    receivingWarehouse.items[existingReceivingItemIndex].quantity += transferStockQty;
  } else {
    receivingWarehouse.items.push({
      ...fetchedItem,
      quantity: transferStockQty, // Override with transfer quantity
    });
  }

     // Get current stock

     const currentReceivingWarehouseStock = receivingWarehouse.stockQty;

     //Adjust stock

     const newStockForRecievingWarehouse = parseInt(currentReceivingWarehouseStock) + parseInt(transferStockQty);

     //Update stock

     const updatedReceivingWarehouse = await db.warehouse.update({
        where:{
            id: receivingWarehouseId
        },
        data:{
            stockQty: newStockForRecievingWarehouse
        }
     });

     // UPDATE THE ITEM IN BOTH WAREHOUSES

     // Item in the Giving Warehouse

     




     // Item in the Receiving Warehouse

     

     const adjustment  = await db.transferStockAdjustment.create({
        data:{transferStockQty :parseInt(transferStockQty), itemId,givingWarehouseId,receivingWarehouseId,referenceNumber, notes}
    }) 
    return NextResponse.json(adjustment )


       

     }else{
        return NextResponse.json({
            data: null,
            message: "Giving Warehouse has No enough stock"
        }, {status: 409})


     }

      


     



    
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a adjustment "
        }, {
            status: 500
        })
        
    }
    

     
}


export async function GET(request){
    try {
        const adjustments = await db.transferStockAdjustment.findMany({
            orderBy:{
                createdAt: 'desc' //latest warehouse
            }
        });

        return NextResponse.json(adjustments);

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the Adjustments"
        }, {
            status: 500
        })
        
    }
}



export async function DELETE(request){
    
    try {
    const id = request.nextUrl.searchParams.get("id");

    const deletedAdjstment = await db.transferStockAdjustment.delete({
        where:{
            id
        }
    })

    return NextResponse.json(deletedAdjstment)
        
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            error,
            message: "Failed to Delete the Adjstment"
        }, {
            status: 500
        })
        
        
    }
}



/// Post request in creating an item in warehouses: 


export  async function POST(request){
    try {
        const itemData  = await request.json();

        // Get the warehouse

        const warehouse = await db.warehouse.findUnique({
            where:{
                id: itemData.warehouseId
            }
        });

       
        // Current Stock of the warehouse

        const currentWarehouseStock = warehouse.stockQty;
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(
            itemData.qty
        ) ;



        // Update the stock on the warehouse

        const updatedWarehouse = await  db.warehouse.update({
            where:{
                id: itemData.warehouseId
            },
            data:{
                stockQty: newStockQty

            }
        });






        const item = await db.item.create({
            data: {
            title: itemData.title,
            categoryId: itemData.categoryId,
            sku:itemData.sku,
            barcode: itemData.barcode, 
            quantity: parseInt(itemData.qty),
            unitId: itemData.unitId,
            brandId:itemData.brandId,
            supplierId: itemData.supplierId,
            buyingPrice: parseFloat(itemData.buyingPrice),
            sellingPrice: parseFloat(itemData.sellingPrice),
            reOrderPoint: parseInt(itemData.reOrderPoint), 
            WarehouseId: itemData.warehouseId, 
            imageUrl: [itemData.imageUrl],
            weight: parseFloat(itemData.weight), 
            dimensions: itemData.dimensions, 
            taxRate: parseFloat(itemData.taxRate),
            description:itemData.description,
            notes: itemData.notes, 
            
            }
        });
      



    return NextResponse.json(item)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create the item"
        }, {
            status: 500
        })
        
    }
    

     
}



//last before deploy


export async function POST(request) {
    try {
      const {
        transferStockQty,
        itemId,
        givingWarehouseId,
        receivingWarehouseId,
        referenceNumber,
        notes,
      } = await request.json();
  
      // Fetch the item and warehouses in a transaction

      const fetchedItem = await db.item.findUnique({
        where:{
            id: itemId
        }
     });

     console.log("fetchedItem",fetchedItem)

     const givingWarehouse = await db.warehouse.findUnique({
        where:{
            id: givingWarehouseId
        },
        include:{
            items: true
        }
     });

     const receivingWarehouse = await db.warehouse.findUnique({
        where:{
            id: receivingWarehouseId
        },
        include:{
            items: true
        }
     });

      // Get current stock

      const currentGivingWarehouseStock = givingWarehouse.stockQty;

      const currentReceivingWarehouseStock = receivingWarehouse.stockQty;


    

      /* const [fetchedItem, givingWarehouse, receivingWarehouse] = await Promise.all([
        db.item.findUnique({ where: { id: itemId } }),
        db.warehouse.findUnique({ where: { id: givingWarehouseId,
        ,
        include:{
            items: true
        } } }),
        db.warehouse.findUnique({ where: { id: receivingWarehouseId,
        ,
        include:{
            items: true
        } } }),
      ]); */

      
  
      // Validate stock availability
      if (parseInt(givingWarehouse.stockQty) < parseInt(transferStockQty)) {
        return NextResponse.json(
          { message: "Insufficient stock in the giving warehouse" },
          { status: 409 }
        );
      }

      console.log("This is the givingWAREHOUSEiTEMS",givingWarehouse )
      console.log("This is the receivingWAREHOUSEiTEMS",receivingWarehouse )
  
      // Check if item exists in giving warehouse (safety check)
      const givingItem = givingWarehouse.items.find((item) => item.id === fetchedItem.id);
      if (!givingItem) {
        return NextResponse.json(
          { 
            message: "Item not found in the giving warehouse",
            debug: {
              expectedId: fetchedItem.id,
              availableIds: givingWarehouse.items.map(item => item.id),
            },
          },
          { status: 404 }
        );
      }

      const receivingItem = receivingWarehouse.items.find((item) => item.id === fetchedItem.id);
      const itemExistsInReceivingWarehouse = Boolean(receivingItem);

      const newStockForRecievingWarehouse = parseInt(currentReceivingWarehouseStock) + parseInt(transferStockQty);
      const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);
  

      // Update both warehouses in a transaction
             console.log("Reached here1")
        // Deduct from giving warehouse
        const updatedGivingWarehouse = await  db.warehouse.update({
          where: { id: givingWarehouseId },
          data: {
            stockQty: newStockForGivingWarehouse,
            items: {
                update: {
                  where: {
                    id: fetchedItem.id // ID of the nested item
                  },
                  data: {
                    quantity: parseInt(fetchedItem.quantity) - parseInt(transferStockQty, 10) // New quantity for the item
                  }
                }
            },
          },
        });

        console.log("Reached here2")

      
        // Add to receiving warehouse
        if (itemExistsInReceivingWarehouse) {
            // If item exists, update the quantity
            
       const updatedReceivingWarehouse =     await db.warehouse.update({
              where: { id: receivingWarehouseId },
              data: {
                stockQty: newStockForRecievingWarehouse,
                items: {
                  update: {
                    where: {
                      id: fetchedItem.id
                    },
                    data: {
                      quantity: parseInt(transferStockQty, 10)
                    }
                  }
                }
              }
            });

            console.log("Reached here the receiving has an item", )
          } else {

        

  const updatedReceivingWarehouse = await db.warehouse.update({
    where: { id: receivingWarehouseId },
    data: {
      stockQty: newStockForRecievingWarehouse,
    }
  });
  console.log("Updated receiving warehouse with new item:", updatedReceivingWarehouse);

  console.log("Reached here3")
        
        }

          
      
  

     
      // Log the transfer
      const adjustment = await db.transferStockAdjustment.create({
        data: {
          transferStockQty: parseInt(transferStockQty),
          itemId,
          givingWarehouseId,
          receivingWarehouseId,
          referenceNumber,
          notes,
        },
      });
  
      return NextResponse.json(adjustment);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Failed to process transfer" },
        { status: 500 }
      );
    }
  }



  // After deployment:

  import db from "@/lib/db";
  import { error } from "console";
  import { NextResponse } from "next/server";
  export const dynamic = 'force-dynamic'; 
  
  export  async function POST(request){
      
    try {
    const {transferStockQty, itemId,givingWarehouseId,receivingWarehouseId,referenceNumber, notes} = await request.json();
  
  
    const item = await db.item.findUnique({
        where:{
            id: itemId
        }
     });
  
  
  
        
  // the Giving Warehouse
  
  
  const givingWarehouse = await db.warehouse.findUnique({
    where:{
        id: givingWarehouseId
    }
  });
  
  // Get current stock
  
  const currentGivingWarehouseStock = givingWarehouse.stockQty;
  /* const currentGivingWareHouseItem = await db.givingWarehouse.findUnique({
    where:{
      id: itemId
    }
  }); */
  
  console.log("ItemId",itemId )
  
  const currentGivingWareHouseItem = await db.item.findFirst({
    where: {
      id: itemId, // item ID
      WarehouseId: givingWarehouse.id // warehouse ID
    }
  });
  
  console.log("currentGivingWareHouse", givingWarehouse);
  
  console.log("currentGivingWareHouseItemQuantity", currentGivingWareHouseItem);
  
  
  
  
  
    
  
     if(parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty)){
        //Adjust stock
  
         // Check if the item already exists in the warehouse
  
         console.log("Here yoh");
  
  
  
  
      const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);
      const newStockForGivingWarehouseItem = parseInt(currentGivingWareHouseItem.quantity) - parseInt(transferStockQty)
  
      //Update stock
      
      const updatedGivingWarehouse = await db.warehouse.update({
         where:{
             id: givingWarehouseId
         },
         data:{
             stockQty: newStockForGivingWarehouse,
             //items: item
         }
      });
  
  
      
  
      /* const fetchedItem = await db.item.findUnique({
        where: {
          id: itemId
        }
      })
       */
  
      const updatedItemInGivingWarehouse = await db.item.update({
        where:{
          id: itemId
        },
        data:{
          WarehouseId: givingWarehouseId,
          quantity: newStockForGivingWarehouseItem
        }
      });
  
  
      console.log("UpdatedWarehouse1",updatedItemInGivingWarehouse )
  
  
  
  
  
  
  
  
      // Get the receiving warehouse
  
    const receivingWarehouse = await db.warehouse.findUnique({
        where:{
            id: receivingWarehouseId
        }
     });
  
     /* const currentReceivingWareHouseItem = await db.receivingWarehouse.findUnique({
      where:{
        id: itemId
      }
    });
   */
  
    // Get current stock
  
    const currentReceivingWarehouseStock = receivingWarehouse.stockQty;
    //Adjust stock
  
    const newStockForRecievingWarehouse = parseInt(currentReceivingWarehouseStock) + parseInt(transferStockQty);
  
    const currentReceivingWareHouseItem = await db.item.findFirst({
      where: {
        id: itemId, // item ID
        WarehouseId: receivingWarehouse.id // warehouse ID
      }
    });
  
  
    if(currentReceivingWareHouseItem){
  
      const newStockForReceivigWarehouseItem = parseInt(currentReceivingWareHouseItem.quantity) + parseInt(transferStockQty);
      //Update stock
  
     const updatedReceivingWarehouse = await db.warehouse.update({
      where:{
          id: receivingWarehouseId
      },
      data:{
          stockQty: newStockForRecievingWarehouse
      }
   });
  
   const updatedItemInReceivingWarehouse = await db.item.update({
    where:{
      id: itemId
    },
    data:{
      warehouseId: receivingWarehouseId,
      quantity: newStockForReceivigWarehouseItem
    }
  });
  
    }else{
  
  
     
  
    // Create a new item record in the receiving warehouse
    const newItemInReceivingWarehouse = await db.item.create({
      data: {
      title: item.title,
      categoryId: item.categoryId,
      sku:item.sku,
      barcode: item.barcode, 
      quantity: parseInt(transferStockQty),
      unitId: item.unitId,
      brandId:item.brandId,
      supplierId: item.supplierId,
      buyingPrice: parseFloat(item.buyingPrice),
      sellingPrice: parseFloat(item.sellingPrice),
      reOrderPoint: parseInt(item.reOrderPoint), 
      WarehouseId: receivingWarehouseId, 
      imageUrl: [item?.imageUrl[0]],
      weight: parseFloat(item.weight), 
      dimensions: item.dimensions, 
      taxRate: parseFloat(item.taxRate),
      description:item.description,
      notes: item.notes, 
      
      }
  });
  
    // Update receiving warehouse's total stock quantity
    const updatedReceivingWarehouse = await db.warehouse.update({
        where: {
            id: receivingWarehouseId
        },
        data: {
            stockQty: {
                increment: parseInt(transferStockQty)
            }
        }
    });
  
      
  
    }
  
    
  
  
  
  
  
  
  
     
     
  
     
  
  
  
    
  
     // Item in the Giving Warehouse
  
     
  
  
  
  
     // Item in the Receiving Warehouse
  
     
  
     const adjustment  = await db.transferStockAdjustment.create({
        data:{transferStockQty :parseInt(transferStockQty), itemId,givingWarehouseId,receivingWarehouseId,referenceNumber, notes}
    }) 
    return NextResponse.json(adjustment )
  
  
       
  
     }else{
        return NextResponse.json({
            data: null,
            message: "Giving Warehouse has No enough stock"
        }, {status: 409})
  
  
     }
  
      
  
  
     
  
  
  
    
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a adjustment "
        }, {
            status: 500
        })
        
    }
    
  
     
  }
  
  
  export async function GET(request){
      try {
          const adjustments = await db.transferStockAdjustment.findMany({
              orderBy:{
                  createdAt: 'desc' //latest warehouse
              }
          });
  
          return NextResponse.json(adjustments);
  
          
      } catch (error) {
          console.log(error)
          return NextResponse.json({
              error,
              message: "Failed to Fetch the Adjustments"
          }, {
              status: 500
          })
          
      }
  }
  
  
  
  export async function DELETE(request){
      
      try {
      const id = request.nextUrl.searchParams.get("id");
  
      const deletedAdjstment = await db.transferStockAdjustment.delete({
          where:{
              id
          }
      })
  
      return NextResponse.json(deletedAdjstment)
          
      } catch (error) {
          console.log(error);
  
          return NextResponse.json({
              error,
              message: "Failed to Delete the Adjstment"
          }, {
              status: 500
          })
          
          
      }
  }



  ///import DashboardBanner from '@/components/dashboard/DashboardBanner'
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