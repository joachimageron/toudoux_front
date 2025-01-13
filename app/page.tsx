"use client";

import { Button, Link, Spacer} from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="mb-4 text-center">
        Bienvenue dans <strong>Toudoux</strong>
      </h1>
      
      <p className="text-center max-w-[600px]">
        L'outil ultime pour prendre rapidement des notes, gérer vos tâches
        et organiser toutes vos idées !
      </p>
      
      <Spacer y={3}/>
      
      <Link href="/notes">
        <Button color={"primary"}>Accéder à mes notes</Button>
      </Link>
    </main>
  );
}