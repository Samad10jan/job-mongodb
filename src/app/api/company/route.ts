import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const user = await getUserFromCookies();

    if (!user) {

        return NextResponse.json(
            {
                success: false,
                message: " Not a User",
                data: user
            }
        )
    }

    const body = await req.json();
    console.log(body);
    

    const company = {
        title: body.title,
        description: body.description,
        ownerId: user.id //setting ownerId to current user id
    }
    try {

        const newCompany = await prismaClient.company.create({
            data: company
        })

        return NextResponse.json({
            success: true,
            data: newCompany

        })


    }
    catch (err) {
        console.log(err.message);
        return NextResponse.json({
            success: false,

        })

    }

}