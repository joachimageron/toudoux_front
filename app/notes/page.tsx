'use client';

import SideBar from "@/app/notes/SideBar";

export default function Page() {
  
  return (
    <div className={'flex'}>
      <SideBar/>
      <main className={''}>
        <h1 className={'text-bold'}>Notes</h1>
        <p>Here are your notes</p>
      </main>
    </div>
  );
}