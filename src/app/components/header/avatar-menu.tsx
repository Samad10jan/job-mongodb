import { Avatar, Button, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { Company, User } from "../../../../generated/prisma";
import LogOut from "./logout-btn";
import { UwC } from "@/types";

export default function AvatarMenu({ user }: { user: UwC | null }) {
  return (
    <div className="hover:cursor-pointer">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="hover:shadow-xl/60 shadow-emerald-500">
          {user?.details?.avatar ? (
            <Avatar size="4" src={user?.details?.avatar} fallback="User" />
          ) : (
            <Button variant="soft" size={"3"}>{(user?.email?.[0])?.toUpperCase()}</Button>
          )}
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="relative right-1.5">
         
          {user?.email && <DropdownMenu.Item>{user.email}</DropdownMenu.Item>}

        
          {user?.company?.id ? (
            <div>
              <DropdownMenu.Separator />
              <Link href="/add-job">
                <DropdownMenu.Item shortcut="⌘ A">Add Job</DropdownMenu.Item>
              </Link>
              <Link href={`/company/${user.company.id}`}>
                <DropdownMenu.Item shortcut="⌘ D">My Company</DropdownMenu.Item>
              </Link>
            </div>
          ) : (
            user?.role==="recruiter" &&
            <Link href="/add-company">
              <DropdownMenu.Item shortcut="⌘ D">Add Company</DropdownMenu.Item>
            </Link>
          )}

          <DropdownMenu.Separator />

         
          <Link href="/applied-app">
            <DropdownMenu.Item>Applied</DropdownMenu.Item>
          </Link>

        
          {user?.id && (
            <Link href={`/savedJobs/${user.id}`}>
              <DropdownMenu.Item>Saved Jobs</DropdownMenu.Item>
            </Link>
          )}

         
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Setting</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
             <Link href={"/userprofile"}>
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
             </Link>
              <DropdownMenu.Item>Other</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />

          {/* Logout */}
          {user?.id && (
            <div>
              <LogOut />
            </div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
