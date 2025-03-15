import db from "@/lib/db";
import { NextResponse } from "next/server";

export  async function POST(request){
    
    try {
        const {addStockQty, receivingWarehouseId,referenceNumber,itemId, notes} = await request.json();
        const adjustment  = await db.addStockAdjustment.create({
            data:{addStockQty :parseInt(addStockQty), itemId,receivingWarehouseId,referenceNumber, notes}
        })
    console.log(adjustment )
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