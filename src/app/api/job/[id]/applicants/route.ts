import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const jobId = await params.id;
  if (!jobId) {
    return NextResponse.json({
      success: false,
      message: "No Job ",
    });

  }

  try{
    const applicants= await prismaClient.application.findMany({
        where:{
            job_id:jobId
        },
        include:{
            user:true
        }
    })
    return NextResponse.json({
      success: true,
      message: "Got Applicants ! ",
      data:applicants
    });


  }catch(err){
     return NextResponse.json({
      success: true,
      message: "No Applicants:( ",
     
    });

  }
}
