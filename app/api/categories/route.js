import db from "@/lib/db";
import { NextResponse } from "next/server";

export  async function POST(request){
    try {
        const {title, description} = await request.json();
    const category  = await  db.category.create({
        data:{
            title,
            description
        }
    })
    console.log(category)
    return NextResponse.json(category)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a category"
        }, {
            status: 500
        })
        
    }
    

     
}

export async function GET(request){
    try {
        const categories = await db.category.findMany({
            orderBy:{
                createdAt: 'desc' //latest warehouse
            }
        });

        return NextResponse.json(categories);

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the Categories"
        }, {
            status: 500
        })
        
    }
}