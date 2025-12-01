import { ReactNode } from "react";
import ThemeContext from "../components/context/theme-context";
import UserContextProvider from "../components/context/user-context";
import Header from "../components/header/header";
import { getUserDark, getUserFromCookies } from "@/helper";
import { UwC } from "@/types";

export default async function Layout({ children }: {
    children: ReactNode,

}) {


    const user = await getUserFromCookies();
    // console.log("user layout:", user);
    const isDarkk = await getUserDark()



    return (
        <ThemeContext isdark={isDarkk as boolean}>
            <div className={`!transition-all !delay-100  `}  >


                <UserContextProvider user={user as UwC}>

                    <Header />
                    {children}
                </UserContextProvider>

            </div>
        </ThemeContext>
    )


}