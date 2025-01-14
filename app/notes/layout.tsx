'use client';
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import NavBar from "@/app/components/NavBar";


export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/auth/signin");
    }
  }, []);  return (
    <>
      <NavBar/>
      {children}
    </>
  );
}