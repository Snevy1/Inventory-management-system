import { NextResponse } from "next/server";

export  async function POST(request){
    try {
        const {title, description, location, type} = await request.json();
    const warehouse  = {title, description, location, type}
    console.log(warehouse)
    return NextResponse.json(warehouse)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a warehouse"
        }, {
            status: 500
        })
        
    }
    

     
}