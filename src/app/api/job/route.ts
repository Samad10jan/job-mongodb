import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { getUserFromCookies } from "@/helper"; // if you use it later

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Optionally verify or enrich `body` here using user info
        // const user = await getUserFromCookies();

        const data = await prismaClient.opening.create({
            data: body,
        });

        return NextResponse.json({
            success: true,
            job: data,
            message: "Job created successfully",
        }, { status: 201 });

    } catch (err) {
        console.error("Job creation error:", err);

        return NextResponse.json({
            success: false,
            message: "Failed to create job",
        }, { status: 500 });
    }
}
