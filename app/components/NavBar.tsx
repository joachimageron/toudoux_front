import {Link} from "@nextui-org/react";
import HomeIcon from "@/app/components/icons/HomeIcon";
import UserAvatarMenu from "@/app/components/UserAvatarMenu";
import DarkModeSwitch from "@/app/components/DarkModeSwitch";


export default function NavBar() {
  const token = sessionStorage.getItem("token");
  return (
    <nav className={"fixed top-0 left-0 w-full h-12 bg-primary flex justify-start items-center z-30"}>
      <div className={"flex justify-center gap-10 items-center px-5"}>
        { token && (
              <>
                <Link href={"/notes"} className={"w-7"}>
                  <HomeIcon className={"fill-zinc-50"}/>
                </Link>
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