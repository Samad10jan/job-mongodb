"use client";

import { logOutUser } from "@/helper";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export default function LogOut() {
  const handleLogout = async () => {
    try {
      await logOutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button onClick={handleLogout} name="logout">
      <ExternalLinkIcon />
      Log Out
    </Button>
  );
}
