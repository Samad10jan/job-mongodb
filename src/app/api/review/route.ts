
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await getUserFromCookies();

    if (!user) {
        return NextResponse.json({
            success: false,
            message: "No User Logged in is Present"
        })
    }

    const body = await req.json();

    if ((body.content.trim()).length == 0) {
        return NextResponse.json({
            success: false,
            message: "No Review given"
        })
    }
    const data = {
        ...body,
        user_id: user.id
    }

    try {

        const review = await prismaClient.reviews.create({
            data: data
        })

        if (review) {
            return NextResponse.json({
                success: true,
                message: "Review Given",
                data: review
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Unable to Give Review",
                data: review
            })

        }
    } catch (err:any) {
        console.log(err.message);

        return NextResponse.json({
            success: false,
            message: "Error while review",

        })

    }

}