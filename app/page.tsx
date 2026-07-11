"use client"
import Image from "next/image";
import Tabela from "./components/tabela";
import { useEffect, useState } from "react";
import AddTorneio from "./components/addtorneio";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <main>
      <div className='flex items-center justify-center h-screen gap-4'>
          <button onClick={()=>{router.push('/campeonatos/criar')}}>Criar Campeonato</button>
          <button>Meus Campeonatos</button>
      </div>
    </main>
  );
}
