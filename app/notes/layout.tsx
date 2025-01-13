'use client';
import {useEffect} from "react";
import {useRouter} from "next/navigation";


export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/notes");
    }
  }, []);  return (
    <>
      {children}
    </>
  );
}