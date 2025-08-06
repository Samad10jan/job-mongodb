import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export  async function GET (req:NextRequest,{params}){

    const id = await params.id;
    // console.log(id);
    if(!id){
        return NextResponse.json({
            success:false,
            message:"No id"
        })
    }
    
    try{
        const job = await prismaClient.opening.findUnique({
            where:{
                id:id
            },
            include:{
                company:true
            }
        })
        if(job){
            return NextResponse.json({
                success:true,
                message:"Here is JoB Details",
                data:job
            })
        }
        else{
             return NextResponse.json({
                success:false,
                message:"No Job found",
                data:job
            })

        }
    }catch(err){
        console.log(err.message);
        return NextResponse.json({
            success:false,
            message:"Job Error"

        })
        
    }

}

export async function DELETE(req:NextRequest,{params}){

    const id = await params.id;
    // console.log(id);
    if(!id){
        return NextResponse.json({
            success:false,
            message:"No id"
        })
    }
    
    try{
        const job = await prismaClient.opening.delete({
            where:{
                id:id
            },
           
        })
        if(job){
            return NextResponse.json({
                success:true,
                message:"Job deleteion Success",
                data:job
            })
        }
        else{
             return NextResponse.json({
                success:false,
                message:"Failed",
                data:job
            })

        }
    }catch(err){
        console.log(err.message);
        return NextResponse.json({
            success:false,
            message:"Deletion code Error"

        })
        
    }

}

export  async function POST(req:NextRequest,{params}){

    const id = await params.id;

    // console.log(id);
    if(!id){
        return NextResponse.json({
            success:false,
            message:"No id"
        })
    }
    const body = await req.json();
    ;
    
    
    try{
        const job = await prismaClient.opening.update({
           where:{
            id:id
           },
           data:body
           
        })
        
    
        
        if(job){
            return NextResponse.json({
                success:true,
                message:"Updated",
                data:job
            })
        }
        else{
             return NextResponse.json({
                success:false,
                message:"Unable to Update",
                data:job
            })

        }
    }catch(err){
        console.log(err.message);
        return NextResponse.json({
            success:false,
            message:"Updation of Job Error"

        })
        
    }

}

