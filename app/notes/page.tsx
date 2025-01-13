'use client';

import SideBar from "@/app/notes/SideBar";
import {useState} from "react";
import CategoryContainer from "@/app/notes/CategoryContainer";

export default function Page() {
  const [categories, setCategories] = useState([
    'courses',
    'work',
    'personal'
  ])
  return (
    <div className={'flex'}>
      <SideBar/>
      <main className={'flex gap-3 p-5 overflow-x-scroll'}>
        {categories.map((category) => (
          <CategoryContainer categoryName={category} key={category}/>
        ))}
      </main>
    </div>
  );
}