

import { ReactNode } from "react";
import { Company, Role, SavedJobs, User, UserDetails } from "../../../generated/prisma";
import ThemeContext from "../components/context/theme-context";
import UserContextProvider from "../components/context/user-context";
import Header from "../components/header/header";

import { getUserDark, getUserFromCookies } from "@/helper";

export type UwC = {
    id: string;
    email: string;
    password: string;
    role: Role | null;
} & { company: Company, SavedJobs: SavedJobs[], details: UserDetails } | null

export default async function Layout({ children }: {
    children: ReactNode
}) {

    // const [user, setUser] = useState<User|null>(null);
    // const res = await fetch("http://localhost:3000/api/current-user");

    //         const data = await res.json();


    //         if (!data) return <Spinner size={"3"}/>
    //  {


    //phle sirf user la rhe the current user se abb  user + company ( agar FindUnique ownerid == userid then sending with data of company associated with that user in company model in fild userId )
    // jis ke pass company hai wohi add kare new job
    // extra -> or jis ke pass company nahi wo add kar saake


    // console.log(data.user);

    // }
    const user = await getUserFromCookies();
    // console.log("user layout:", user);
    const isDarkk = await getUserDark()


    // useEffect(() => {
    //     async function getUser() {

    //     }
    //     getUser();
    // }, [])


    // console.log(user);

    // const user={}
    // const user = await prismaClient.user.findUnique({
    //     where: {
    //         email: tokenEmail
    //     }
    // })

    return (
        <ThemeContext isdark={isDarkk as boolean}>
            <div className="!transition-all !delay-100">


                <UserContextProvider user={user as UwC}>

                    <Header />

                    {children}
                </UserContextProvider>

            </div>
        </ThemeContext>
    )


}