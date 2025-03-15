import db from "@/lib/db";
import { NextResponse } from "next/server";

export  async function POST(request){
    
    try {
    const {transferStockQty, itemId,givingWarehouseId,receivingWarehouseId,referenceNumber, notes} = await request.json();
    const adjustment  = await db.transferStockAdjustment.create({
        data:{transferStockQty :parseInt(transferStockQty), itemId,givingWarehouseId,receivingWarehouseId,referenceNumber, notes}
    }) 
    console.log(adjustment )
    return NextResponse.json(adjustment )
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