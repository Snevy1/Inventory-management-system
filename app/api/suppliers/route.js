import db from "@/lib/db";
import { NextResponse } from "next/server";
import { title } from "process";

export  async function POST(request){
    try {
        
        const {title, phone, email,address, notes, contactPerson,supplierCode, taxID, paymentTerms} = await request.json();
        const supplier  = await  db.supplier.create({
            data:{
               title, phone, email,address, notes, contactPerson,supplierCode, taxID, paymentTerms
            }
        })
    
    return NextResponse.json(supplier)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a Supplier"
        }, {
            status: 500
        })
        
    }
    

     
}


export async function GET(request){
    try {
        const suppliers = await db.supplier.findMany({
            orderBy:{
                createdAt: 'desc' //latest suppliers
            }
        });


        return NextResponse.json(suppliers);

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch suppliers"
        }, {
            status: 500
        })
        
    }
}