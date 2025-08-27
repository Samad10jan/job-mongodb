"use server"

import { cookies } from "next/headers";

export async function logOut() {
    console.log("logoout");
    const userCookies = await cookies();
    userCookies.delete("token");
    userCookies.delete("isDark");
    
    return true
}