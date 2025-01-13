"use client";

import {Listbox, ListboxItem, Avatar, Tooltip} from "@nextui-org/react";
import {Key} from "react";
import {useRouter} from "next/navigation";

export default function UserAvatarMenu() {
  const router = useRouter();
  
  const handleAction = (key: Key) => {
    switch (key) {
      case "profil":
        // router.push("/profil/" + session?.user.userId);
        break;
      case "signout":
        sessionStorage.removeItem("token");
        router.push("/auth/signin");
        break;
    }
  }
  
  return (
    <Tooltip
      content={
        <div className="flex flex-col justify-center items-center">
          <Listbox
            aria-label="Actions"
            onAction={(key) => handleAction(key)}
          >
            <ListboxItem key="profil">Edit profil</ListboxItem>
            <ListboxItem key="signout" className="text-danger" color="danger">
              Sign out
            </ListboxItem>
          </Listbox>
        </div>
      }
    >
      <Avatar showFallback className={"hover:cursor-pointer w-7 h-7"} src={undefined}/>
    </Tooltip>
  
  
  )
}