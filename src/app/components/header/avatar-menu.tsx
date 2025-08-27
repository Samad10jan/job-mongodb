
import { Avatar, Button, DropdownMenu } from "@radix-ui/themes";

import Link from "next/link";
import LogOut from "./logout-btn";
import { Company, User } from "../../../../generated/prisma";

export default function AvatarMenu({ user }:{
    user:User&{company:Company}|null
}) {


    return (
        <div className="hover:cursor-pointer ">
            <DropdownMenu.Root >

                <DropdownMenu.Trigger className="hover:shadow-xl/60 shadow-emerald-500">

                    {user?.avatar ?

                        <Avatar
                            size={"4"}
                            src={user?.avatar}
                            fallback={"User"}

                        /> :
                        <p>{(user?.email[0])?.toUpperCase()}</p>
                    }

                </DropdownMenu.Trigger>


                <DropdownMenu.Content className=" relative right-1.5">
                    {user?.email && <DropdownMenu.Item>{user?.email}</DropdownMenu.Item>
                    }
                    {
                        (user?.company?.id)

                        &&
                        <div>
                            <DropdownMenu.Separator />
                            <Link href={"/add-job"}> <DropdownMenu.Item shortcut="⌘ A">Add Job</DropdownMenu.Item></Link>

                            <Link href={"/company/" + user?.company?.id}> <DropdownMenu.Item shortcut="⌘ D">MY Company</DropdownMenu.Item></Link>
                        </div>
                    }
                    {
                        (!user?.company)

                        &&

                        <Link href={"/add-company"}><DropdownMenu.Item shortcut="⌘ D">Add Company</DropdownMenu.Item></Link>
                    }
                    <DropdownMenu.Separator />

                    <Link href={"/applied-app"}> <DropdownMenu.Item>Applied</DropdownMenu.Item> </Link>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Setting</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item>Profile Settings</DropdownMenu.Item>  {/* Dialog, or New Page, or NewComponent Dialog ???? */}
                            <DropdownMenu.Item>Other</DropdownMenu.Item>

                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>

                    <DropdownMenu.Separator />
                    {
                        (user?.id)

                        &&
                        <div>
                            <LogOut />
                        </div>

                    }

                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    )
}