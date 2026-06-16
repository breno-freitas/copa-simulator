import Image from "next/image";
import Tabela from "./components/tabela";

export default function Home() {
  return (
    <main>
      <nav className='flex justify-between gap-4'>
        <div>
          <button>Options</button>
        </div>
        <div>
          <h1>Copa Simulator</h1>
        </div>
        <div className='flex gap-4'>
          <button>Login</button>
          <button>Register</button>
        </div>
      </nav>
      <div className='flex items-center justify-center h-screen gap-4'>
          <button>Criar Campeonato</button>
          <button>Meus Campeonatos</button>
      </div>
      <div>
        <Tabela />
        <p>tabela</p>
      </div>
    </main>
  );
}
