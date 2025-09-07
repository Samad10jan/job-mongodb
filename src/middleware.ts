import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "./helper";

export default async function Middleware(req: NextRequest) {

    const userId = req.cookies.get('token')?.value;

    // const user = await getUserFromCookies()
    
    

    const protectedpaths = ["/company","/add-company","/add-job","/userprofile"]
    
    if (protectedpaths.includes(req.nextUrl.pathname)) {

        if (!userId) {
            // then redirect user to login page , so user can't access protected paths until sucessful login
            return NextResponse.redirect("http://localhost:3000/login")
        }
        
    }
    return NextResponse.next(); 
}

