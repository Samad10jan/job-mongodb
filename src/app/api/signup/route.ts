
import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const userToCreate = {
        email: body.email,
        password: body.password,

    }

    let userId
    // 500 are server errors
    try {

        const user = await prismaClient.user.create({
            data: userToCreate
        })
        const userTokenData = {
            id: user?.id
        }
        userId = user.id
        const userDetails = await prismaClient.userDetails.create({
            data: {
                userId: user.id,
                firstName: body.firstName,
                lastName: body.lastName
            }
        })


        const token = await createToken(userTokenData)

        const res = NextResponse.json({
            success: true,
            message: "User SignUp",
            data: user

        },
            { status: 201 }
        )

        res.cookies.set("token", token);

        return res

    } catch (err: any) {
        console.log(err.message);

        // just in case if user created but userDeatil throws Error, to User delete kar na padega :(
        await prismaClient.userDetails.deleteMany({
            where: { userId: userId },
        });

        return NextResponse.json({
            success: false,
            message: "Error while sign up"
        },
            { status: 500 },
        )

    }

}