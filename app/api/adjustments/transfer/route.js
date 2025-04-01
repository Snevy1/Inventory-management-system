import db from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";

export  async function POST(request){
    
    try {
    const {transferStockQty, itemId,givingWarehouseId,receivingWarehouseId,referenceNumber, notes} = await request.json();


        
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

      const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);

      //Update stock
 
      const updatedGivingWarehouse = await db.warehouse.update({
         where:{
             id: givingWarehouseId
         },
         data:{
             stockQty: newStockForGivingWarehouse
         }
      });




      // Get the receiving warehouse

    const receivingWarehouse = await db.warehouse.findUnique({
        where:{
            id: receivingWarehouseId
        }
     });

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