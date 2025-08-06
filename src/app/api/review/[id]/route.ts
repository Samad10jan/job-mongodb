import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}) {

    const company_id = await params.id

    try{
        const review = await prismaClient.reviews.findMany({
            where:{
                company_id:company_id
            },
            include:{
                user:{
                    include:{
                        company:true
                    }
                }
            }
        })
         if(review.length){
            return NextResponse.json({
                success:true,
                message:"Got Reviews",
                data:review
            })
        }
        else{
             return NextResponse.json({
                success:false,
                message:"Unable to Get Review",
                data:review
            })

        }

    }catch(err){
         return NextResponse.json({
                success:false,
                message:"Review error",
                
            })

    }
    
    
}