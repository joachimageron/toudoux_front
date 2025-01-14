'use client';
import UserAvatarMenu from "@/app/components/UserAvatarMenu";
import DarkModeSwitch from "@/app/components/DarkModeSwitch";
import {useEffect, useState} from "react";


export default function NavBar() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(window.sessionStorage.getItem("token"));
    
  }, []);
  return (
    <nav className={"sticky top-0 left-0 w-full h-12 bg-primary flex justify-start items-center z-30"}>
      <div className={"flex justify-center gap-10 items-center px-5"}>
        {token && (
          <>
            {/*<Link href={"/notes"} className={"w-7"}>*/}
            {/*  <HomeIcon className={"fill-zinc-50"}/>*/}
            {/*</Link>*/}
            <div className={"w-7"}>
              <UserAvatarMenu/>
            </div>
          </>
        )
        }
      </div>
      
      <div className={"absolute right-5"}>
        <DarkModeSwitch/>
      </div>
    </nav>
  );
}