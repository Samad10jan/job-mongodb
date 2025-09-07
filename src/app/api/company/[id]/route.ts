import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = await params.id;
    // const user = await getUserFromCookies();
    // console.log("user:", user);  // giving user: null

    try {

        const res = await prismaClient.company.findUnique({
            where: {
                id: id
            },

            include: {
                owner: true,
                jobs: true
            }
        })
        // console.log("res", res);

        if (res?.title) {
            return NextResponse.json({
                success: true,
                message: "Company is there",
                data: res

            })

        }
        else {
            return NextResponse.json({
                success: false,
                message: "Unable to find Company for Current user",


            })

        }
    } catch (err: any) {
        console.log(err.message);
        return NextResponse.json({

            success: false,
            message: "Error in Fetching Company data"


        })

    }


}

// DELETE method

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = await params.id;

    if (!id) {
        return NextResponse.json({
            success: false,
            message: "No id"
        })
    }

    const user = await getUserFromCookies();
    // console.log("user:" ,user);

    const company = await prismaClient.company.findUnique({
        where: {
            id
        }
    })


    if (user?.id == company?.ownerId) {


        try {
          
            // await prismaClient.reviews.deleteMany({
            //     where: { company_id: id }
            // });

            // cascade delete 
            // application 
            // opening also
            // also review now 


            // Now delete the parent company
            const res = await prismaClient.company.delete({
                where: { id }
            });

            // console.log(res);

            return NextResponse.json({
                success: true,
                message: "Deleted",
                data: res
            });

        } catch (err: any) {
            console.log(err.message);
            return NextResponse.json({
                success: false,
                message: "Error during deletion",
                error: err.message
            });
        }

    } else {
        return NextResponse.json({
            success: false,
            message: "Not authorized User"
        })
    }

}