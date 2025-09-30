import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" });
    }

    const savedJobs = await prismaClient.savedJobs.findMany({
      where: { userId },
      include: { job: {include:{company:true}}}, 
    });

    return NextResponse.json(savedJobs);
  } catch (error) {
    console.error("GET /savedJobs error:", error);
    return NextResponse.json({ error: "Failed to fetch saved jobs" }, { status: 500 });
  }
}


export async function POST(req: Request) {

  try {
    const { userId, jobId } = await req.json();

    if (!userId || !jobId) {
      return NextResponse.json({ error: "userId and jobId required" });
    }

   
    const existing = await prismaClient.savedJobs.findFirst({
      where: { userId, jobId },
    });

    if (existing) {
      return NextResponse.json({ message: "Job already saved" });
    }

    const savedJob = await prismaClient.savedJobs.create({
      data: { userId, jobId },
    });

    return NextResponse.json(savedJob, { status: 201 });
  } catch (error) {
    console.error("POST /savedJobs error:", error);
    return NextResponse.json({ error: "Failed to save job" });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, jobId } = await req.json();

    if (!userId || !jobId) {
      return NextResponse.json({ error: "userId and jobId required" }, { status: 400 });
    }

    await prismaClient.savedJobs.deleteMany({
      where: { userId, jobId },
    });

    return NextResponse.json({ message: "Job unsaved successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /savedJobs error:", error);
    return NextResponse.json({ error: "Failed to unsave job" }, { status: 500 });
  }
}
