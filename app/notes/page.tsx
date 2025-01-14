'use client';

import SideBar from "@/app/notes/SideBar";
import {useEffect, useState} from "react";
import CategoryContainer from "@/app/notes/CategoryContainer";
import {Categories} from "@/utils/types/Category";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [categories, setCategories] = useState<Categories | undefined>()
  
  useEffect(() => {
    const fetchCategories = async () => {
      const token = sessionStorage.getItem("token");
      
      const response = await fetch("http://localhost:8000/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/ld+json",
          "Authorization": `Bearer ${token}`
        },
      });
      
      if (response.ok) {
        return await response.json() as Promise<Categories>;
      }
      else if (response.status === 401) {
        toast.error("Unauthorized");
        window.sessionStorage.removeItem("token");
        router.push("auth/signin");
      }
      else {
        toast.error("An error occurred while fetching categories");
      }
    }
    
    fetchCategories().then(category => {
      if (category) {
        setCategories(category)
      }
    })
  }, []);
  
  return (
    <div className={'flex'}>
      <SideBar categories={categories} setCategories={setCategories}/>
      <main className={'flex gap-3 p-5 overflow-x-scroll h-[94vh]'}>
        {categories?.member.map((category) => (
          <CategoryContainer category={category} setCategories={setCategories} key={category.id+"coucou"}/>
        ))}
      </main>
    </div>
  );
}