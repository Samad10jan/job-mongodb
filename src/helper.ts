"use server"
import { cookies } from "next/headers";
import prismaClient from "./services/prisma";
import { verifyToken } from "./services/jwt";

export async function getUserFromCookies() {
    const userCookies = await cookies();
    const token = userCookies.get("token")?.value


    if (!token) { return null }

    const userId = verifyToken(token);
    // console.log(userId); //?was: { email: '688ef16f43b582c62f6c1c62', iat: 1754202429 } 
    //                              so chnages done on jwt side only saving id


    if (!userId) { return null }

    // console.log(userId);
    try {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            },
            include: {
                company: true
            }
            // ,
            // omit: {
            //     password: true
            // }
        }) 
        if (!user) { return null }

        return user

    }
    catch (err: any) {
        console.log(err.message);
        return null

    }
}

export async function logOutUser() {
    const userCookies = await cookies();
    userCookies.delete("token")
    userCookies.delete("isDark");
    return true

}

export async function setUserDark(isDark:boolean) {

    const userCookies = await cookies();
    userCookies.set("isDark", isDark.toString());
    return true
}

export async function getUserDark() {
    const userCookies = await cookies();
    const isDark = userCookies.get("isDark")?.value;
    if(isDark !== "true" ){
        return false
    }
    return isDark
}