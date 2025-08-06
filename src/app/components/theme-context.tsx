"use client"
import { Theme } from "@radix-ui/themes";
import { createContext, useState } from "react";
export const ThContext=createContext();

export default function ThemeContext ({children}){
   const [isDark,setIsDark]=useState(true);
    return(
        <ThContext.Provider value={{isDark,setIsDark}}>
        <Theme appearance={isDark?"dark":"light"}>
            {children}
        </Theme>
        </ThContext.Provider>
    )

}