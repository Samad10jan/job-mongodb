import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const userToCreate = {
        email: body.email,
        password: body.password
    }

    // 500 are server errors
    try {

        const user = await prismaClient.user.create({
            data: userToCreate
        })
        const userTokenData = {
            email: user.id
        }
        const token =await createToken(userTokenData)
       
        const res = NextResponse.json({
            success: true,
            message:"User SignUp",
            data: user

        },
            { status: 201 }
        )

        res.cookies.set("token", token);
        
        return res

    } catch (err) {
        console.log(err.message);

        return NextResponse.json({
            success: false,
            message: "Error while sign up"
        },
            { status: 500 }
        )

    }

}