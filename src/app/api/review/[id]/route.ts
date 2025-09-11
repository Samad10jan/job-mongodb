
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}: { params: { id: string } }) {

    const company_id = await params.id

    try{
        const review = await prismaClient.reviews.findMany({
            where:{
                company_id:company_id
            },
            include:{
                user:{
                    omit:{
                        password:true
                    },
                    include:{
                        company:true,
                        details:true
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



export async function DELETE(req:NextRequest,{params}: { params: { id: string } }) {

    const givenid = await params.id

    try{
        const review = await prismaClient.reviews.delete({
           where:{
            id:givenid
           }
        })
         if(review){
            return NextResponse.json({
                success:true,
                message:"Got Review  Deleted",
                data:review
            })
        }
        else{
             return NextResponse.json({
                success:false,
                message:"Unable to Delete Review",
                data:review
            })

        }

    }catch(err){
         return NextResponse.json({
                success:false,
                message:"Review Deletion Error",
                
            })

    }
    
    
}