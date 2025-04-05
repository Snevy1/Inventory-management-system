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
    sku: item.sku, // item ID
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

    /* const updatedItemInGivingWarehouse = await db.item.update({
      where:{
        id: itemId
      },
      data:{
        WarehouseId: givingWarehouseId,
        quantity: newStockForGivingWarehouseItem
      }
    });
 */
    const updatedItemInGivingWarehouse = await db.item.updateMany({
      where: {
        sku: item.sku,
        WarehouseId: givingWarehouseId,
      },
      data: {
        quantity: newStockForGivingWarehouseItem,
      },
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
      sku: item.sku, // item sku
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


 

 console.log("Stopped here");
 console.log("SK", item.sku )

const updatedItemInReceivingWarehouse = await db.item.updateMany({
  where: {
    sku: item.sku,
    WarehouseId: receivingWarehouseId,
  },
  data: {
    quantity: newStockForReceivigWarehouseItem,
  },
});

console.log("We are here for updatedItemInReceivingWarehouse", updatedItemInReceivingWarehouse )

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