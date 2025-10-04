
"use client";
import { ArrowLeftIcon, MagnifyingGlassIcon, MoonIcon, SunIcon, } from "@radix-ui/react-icons";
import { Avatar, Badge, Button, IconButton, TextField, } from "@radix-ui/themes";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AvatarMenu from "./avatar-menu";

import { usePathname, useRouter } from "next/navigation";
import { ThContext } from "../context/theme-context";


import { setUserDark } from "@/helper";
import { Job } from "../../../../generated/prisma";
import { UserContext } from "../context/user-context";



export default function Header() {

    const { isDark, setIsDark }: any = useContext(ThContext);
    const { user } = useContext(UserContext);
    const [suggestions, setSuggestions] = useState<Job[]>([]);
    // const params= useSearchParams()
    //  const q = params?.get("q") ||""
    const [searchq, setSearchq] = useState("");


    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        async function getSuggesstion() {
            const res = await fetch(
                "/api/sugesstions?q=" + searchq
            );
            const data = await res.json();
            if (data.success) {
                setSuggestions(data.data);
            }
        }

        // debouncing
        // useEffect on change of searchq it will firts call return statement(clerr x time and yes setTimeout return some time) then if user will have waited 1000ms then getSugesstion() fun will run
        let x: any;
        //getSuggestions only if when any input but delay 300ms
        if (searchq) {
            x = setTimeout(() => {
                getSuggesstion();
            }, 300);
        } else {
            setSuggestions([]);
        }

        return () => {
            if (x) clearTimeout(x);
        };
    }, [searchq]);

    return (

        <header className={`!sticky !top-0 !z-[500] !w-full !h-auto !p-3 md:!p-4 !flex !items-center ${isDark ? '!bg-black/95' : '!bg-white/95'} !backdrop-blur-lg !transition-all !border-b ${isDark ? '!border-gray-800' : '!border-gray-200'}`}>

            {/* Back Button */}
            {pathName !== "/" && (
                <div className="!mr-2 md:!mr-4 !flex !items-center">
                    <button
                        onClick={() => router.back()}
                        title="Previous Page"
                        className="!p-0 !border-0 !bg-transparent"
                    >
                        <ArrowLeftIcon className="!w-6 !h-6 md:!w-8 md:!h-8 hover:!text-emerald-600 hover:!scale-110 !transition-all !cursor-pointer" />
                    </button>
                </div>
            )}

          
            <div className="!flex-1 !max-w-7xl !mx-auto !flex !justify-between !items-center !gap-4">

              
                <div className="!flex-shrink-0">
                    <Link href="/" className="!block" title="Back to Home Page">
                        <span className="!hidden md:!block !text-2xl !font-bold hover:!text-emerald-600 !transition-colors">
                            HireStack
                        </span>
                        <Avatar
                            src=""
                            fallback="H&"
                            className="md:!hidden !w-12 !h-12 !p-2"
                        />
                    </Link>
                </div>

                {/* Search Form */}
                <form
                    className="!relative !flex-1 !max-w-md !mx-2 md:!mx-4 "
                    action="/search"
                >
                    <div className="!relative !flex !items-center">
                        <TextField.Root
                            placeholder="Search jobs..."
                            name="q"
                            value={searchq}
                            onChange={(e) => setSearchq(e.target.value)}
                            className="!w-full"
                        >
                            <TextField.Slot>
                                <MagnifyingGlassIcon className="!w-4 !h-4" />
                            </TextField.Slot>
                        </TextField.Root>

                        <IconButton
                            type="submit"
                            color="green"
                            className="!hidden md:!flex  hover:!ring-2 !hover:ring-emerald-700 !transition-all !ml-2"
                            radius="full"
                        >
                            <MagnifyingGlassIcon className="!size-4" />
                        </IconButton>
                    </div>


                    {suggestions.length > 0 && (
                        <div className={`!absolute !top-full !left-0 !right-0 !mt-2 !border-2 !border-emerald-600 ${isDark ? '!bg-black !text-white' : '!bg-white !text-black'} !shadow-lg !rounded-md !overflow-hidden !max-h-64 !overflow-y-auto !z-50`}>
                            {suggestions.map((sugg) => (
                                <Link
                                title="job page link"
                                    key={sugg.id}
                                    href={`/job/${sugg.id}`}
                                    onClick={()=>setTimeout(()=>setSearchq(""),700)}
                                    className="!block !px-4 !py-3 hover:!bg-emerald-600 hover:!text-white !text-sm !transition-colors !border-b-1 !border-emerald-600 !m-0.5"
                                >
                                    {sugg.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </form>


                <div className="!flex !items-center !gap-3 md:!gap-4 !flex-shrink-0">

                    <nav className="!hidden lg:!flex !gap-6">
                        <Link title="jump to Jobs section" href="/#jobs" className="!text-base !font-medium hover:!text-emerald-600 !transition-colors !no-underline">
                            Jobs
                        </Link>
                        <Link title="jump to companies section" href="/#companies" className="!text-base !font-medium hover:!text-emerald-600 !transition-colors !no-underline">
                            Companies
                        </Link>
                        <Link title="jump to footer" href="/#contact" className="!text-base !font-medium hover:!text-emerald-600 !transition-colors !no-underline">
                            Contact
                        </Link>
                    </nav>


                    <Button
                        variant="soft"
                        color="green"
                        className="hover:!ring-2 hover:!ring-emerald-600 !rounded-full !w-10 !h-10 !p-0 !flex !items-center !justify-center !transition-all"
                        onClick={() => {
                            setIsDark(!isDark);
                            setUserDark(!isDark);
                        }}
                    >
                        {isDark ? <MoonIcon className="!w-5 !h-5" /> : <SunIcon className="!w-5 !h-5" />}
                    </Button>


                    {user?.email ? (
                        <AvatarMenu user={user} />
                    ) : (
                        <Link href="/login"  title="login">
                            <Badge className="!text-sm md:!text-base !whitespace-nowrap hover:!ring-1 hover:!ring-emerald-600 !p-2 !rounded" >Login</Badge>
                        </Link>
                    )}
                </div>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="scroll-watcher !absolute  !h-1 !bg-gradient-to-r !from-emerald-600 via-indigo-400 !to-emerald-600"></div>
        </header>
    );
}
