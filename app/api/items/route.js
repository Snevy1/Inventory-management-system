import { NextResponse } from "next/server";

export  async function POST(request){
    try {

        /* title, warehouseId, imageUrl, weight, dimensions, taxRate,notes, description, categoryId,sku,
             barcode, qty,unitId,brandId,supplierId, buyingPrice, sellingPrice, reOrderPoint,  type */
        const data  = await request.json();
    
    console.log(data)
    return NextResponse.json(data)
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