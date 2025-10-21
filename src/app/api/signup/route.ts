import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {

    // used transction because it will help in istant rollback in case of Error of any query in this 
    const result = await prismaClient.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: body.email,
          password: body.password,
        },
      });

      const userDetails = await tx.userDetails.create({
        data: {
          userId: user.id,
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });

      return { user, userDetails };
    });

    const token = await createToken({ id: result.user.id });

    const res = NextResponse.json(
      {
        success: true,
        message: "User SignUp successful",
        data: result.user,
      },
      { status: 201 }
    );

    res.cookies.set("token", token);

    return res;
  } catch (err: any) {
    console.log("Error:", err.message);

    if (err.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error while sign up",
      },
      { status: 500 }
    );
  }
}
