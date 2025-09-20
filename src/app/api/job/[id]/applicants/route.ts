
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const jobId = param.id
  if (!jobId) {
    return NextResponse.json({
      success: false,
      message: "No Job ",
    });

  }

  try {
    const applicants = await prismaClient.application.findMany({
      where: {
        job_id: jobId
      },
      include: {
        user: true
      }
    })
    return NextResponse.json({
      success: true,
      message: "Got Applicants ! ",
      data: applicants
    });


  } catch (err) {
    return NextResponse.json({
      success: true,
      message: "No Applicants:( ",

    });

  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const { id } = param

  if (!id) {
    return sendCustomResp(false, { message: "No Id" })
  }

  try {
    const deleteApplication = await prismaClient.application.delete({
      where: {
        id: id

      }
    })
    // console.log(deleteApplication);

    return sendCustomResp(true, { message: "Done Deleteion", data: deleteApplication })

  } catch (err: any) {
    console.log(err.message);
    return sendCustomResp(false, { message: "Not Done Deleteion" })

  }

}



function sendCustomResp(success: boolean, data: any) {
  return NextResponse.json({
    success,
    data
  })
}
