import db from "@/lib/db";
import { NextResponse } from "next/server";

export  async function POST(request){
    
    try {
        const {addStockQty, receivingWarehouseId,referenceNumber,itemId, notes,supplierId} = await request.json();


       

                //  Get Item 
                 const itemToUpdate = await db.item.findUnique({
                    where:{
                     id: itemId
                    } 
                 }); 

                 //console.log(itemToUpdate)

                 //Current Item quantity

         const  currentItemQty = itemToUpdate.quantity;

         //Modify Item quantity to be New Qty

         const newQty = parseInt(currentItemQty) + parseInt(addStockQty)



         const updatedItem  = await db.item.update({
            where:{
                id: itemId
            },

            data: {
                quantity: newQty

            }
        }); 

        
          // Get the warehouse

          const warehouse = await db.warehouse.findUnique({
            where:{
                id: receivingWarehouseId
            }
        });

       
        // Current Stock of the warehouse

        const currentWarehouseStock = warehouse.stockQty;
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(
            addStockQty
        ) ;



        // Update the stock on the warehouse

        const updatedWarehouse = await  db.warehouse.update({
            where:{
                id: receivingWarehouseId
            },
            data:{
                stockQty: newStockQty

            }
        });



         const adjustment  = await db.addStockAdjustment.create({
            data:{addStockQty :parseInt(addStockQty), itemId,receivingWarehouseId,referenceNumber, notes,supplierId}
        }); 

       




        //Affect the warehouse
    


    return NextResponse.json(adjustment)
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
        const adjustments = await db.addStockAdjustment.findMany({
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

    const deletedAdjstment = await db.addStockAdjustment.delete({
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



