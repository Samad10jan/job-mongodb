"use client"

import { UwC } from "@/types";
import { createContext, ReactNode } from "react";
export const UserContext = createContext<{
    user?: UwC | null
}>({})

export default function UserContextProvider({ children, user }: {
    children: ReactNode,
    user: UwC | null
}) {

    return (
        <UserContext.Provider value={{ user }}>

            {children}

        </UserContext.Provider>
    )

}