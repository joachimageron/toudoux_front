'use client';

import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {
  const router = useRouter();
  
  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      router.push("/notes");
    }
  }, []);

  
  return (
    <>
        {children}
    </>
  );
}