import db from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request, {params:{id}}){
    try {
        const supplier = await db.supplier.findUnique({
            where:{
                id
            }
        });

        return NextResponse.json(supplier);

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the Supplier"
        }, {
            status: 500
        })
        
    }
}
export async function PUT(request, {params:{id}}){
    try {

        const {title, phone, email,address, notes, contactPerson,supplierCode, taxID, paymentTerms} = await request.json();
        const supplier = await db.supplier.update({
            where:{
                id
            },
            data: {
                title,
                 phone, 
                 email,
                 address, 
                 notes, 
                 contactPerson,
                 supplierCode,
                  taxID, 
                  paymentTerms
            }

        });

        console.log(supplier)

        return NextResponse.json(supplier);

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Update the supplier"
        }, {
            status: 500
        })
        
    }
}