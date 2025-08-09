import { getUserFromCookies } from "@/helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const user = await getUserFromCookies();
    // console.log("current user:",user);

    if (!user) {

        return NextResponse.json(
            {
                success: false,
                message: " not a user",
                data: user
            }
        )
    }
    // // taking out company data for that user , as we have given ownerId=user.id when we were creating company
    // const userId = user.id

    // const company = await prismaClient.company.findUnique({
    //     where: {
    //         ownerId: userId

    //     }

    // })

    // // current user's data came from helper.ts se or company of that current user is taken out if have same id as user.id
    // const data = {
    //     ...user,
    //     company
    // }


    return NextResponse.json(
        {
            success: true,
            message: "ok",
            data: user
        }
    )
}