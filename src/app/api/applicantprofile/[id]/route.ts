import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const applicantUserId = await params.id;
    // console.log("route",applicantUserId);

    try {

        const res = await prismaClient.user.findUnique({
            where: {
                id: applicantUserId
            },
            include: {
                details:true,
                Application: {
                    where: { user_id: applicantUserId },
                    include: {
                        job: {
                            include: {
                                company: true
                            }
                        }
                    }
                }
            }
        })
        // console.log("res", res);

        if (res?.id) {
            return NextResponse.json({
                success: true,
                message: "Profile is here",
                data: res

            })

        }
        else {
            return NextResponse.json({
                success: false,
                message: "Unable to find Profile",


            })

        }
    } catch (err: any) {
        console.log("error:", err.message);
        return NextResponse.json({

            success: false,
            message: "Error in Fetching User data"


        })

    }
}

