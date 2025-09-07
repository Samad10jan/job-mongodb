
import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const user = await prismaClient.user.findUnique({
        where: {
            email: body.email
        }
    })
    // console.log(user);




    // user password check and set cookies by our self , not like server "use server"
    if (user?.password == body?.password) {

         const userTokenData = {
            id: user?.id
        }
        const res = NextResponse.json({
            success: true,
            message: "Ok",
            user,
            
        })
       
        const token = createToken(userTokenData)

        res.cookies.set("token", token)

        return res
    }

    return NextResponse.json({
        success: false,
        message: "NOt Ok"
    })
}