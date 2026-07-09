"use client"
import Image from "next/image";
import Tabela from "./components/tabela";
import { useEffect, useState } from "react";
import AddTorneio from "./components/addtorneio";

export default function Home() {
  return (
    <main>
      <div className='flex items-center justify-center h-screen gap-4'>
          <button>Criar Campeonato</button>
          <button>Meus Campeonatos</button>
      </div>
    </main>
  );
}
