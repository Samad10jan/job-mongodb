//@ts-nocheck
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
    const user = await getUserFromCookies();
    const jobId = params.id;
    // console.log("job id:",jobId);

    if (!user) {
        return NextResponse.json({
            success: false,
            message: "NO user present"
        })

    }
    console.log("user id :", user.id);

    const appToSave = {
        user_id: user?.id,
        job_id: jobId
    }
    // console.log("data to apply",appToSave);

    try {
        const application = await prismaClient.application.create({
            data: appToSave
        })
        // console.log("app:",application);


        return NextResponse.json({
            success: true,
            message: "Application Done",
            data: application
        })


    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "Application NOT Done"

        })

    }



}

export async function DELETE(req: NextRequest, { params }) {
    const user = await getUserFromCookies();
    console.log("user:",user);
    
    const jobId = await params.id;
    console.log("job id:",jobId);

    if (!user) {
        return NextResponse.json({
            success: false,
            message: "NO user present"
        })

    }
    console.log("user id :", user.id);

   
   

    try {
        const application = await prismaClient.application.deleteMany({
            where:{
                job_id:jobId

            }
        })
        console.log("app:",application);


        return NextResponse.json({
            success: true,
            message: "Application Deletion Done",
            data: application
        })


    } catch (err) {
        console.log(err.message);
        
        return NextResponse.json({
            success: false,
            message: "Application NOT Done"

        })

    }



}