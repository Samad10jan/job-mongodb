import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const q = searchParams.get("q") || "";
  const jt = searchParams.get("jt") || "";
  const et = searchParams.get("et") || "";

  const job = await prismaClient.opening.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: q,
                mode: "insensitive",
              }
            },
            {
              company: {
                title: {
                  contains: q,
                  mode: "insensitive",
                }
              }
            }
          ]
        },
        jt ? { job_type: jt } : {},
        et ? { employment_type: et } : {},
      ],

    },
    include: {
      company: {
        include: {
          owner: true,
        }
      }
    }
  });

  return NextResponse.json({
    success: true,
    message: "ok",
    data: job,
  });
}
