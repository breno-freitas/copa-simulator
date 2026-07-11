import { criarTorneio } from "../api/repository/torneioRepository";
import { TorneioData } from "../api/repository/torneioRepository";
import { useState } from "react";
import { gerarFase } from "../api/service/geradorFase";
import { gerarJogoCopa } from "../api/service/geradorJogos";

type Props = { onCreated: (id: string) => void };

export default function AddTorneio({onCreated}: Props) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("LIGA");
  const [maximumAttendees, setMaximumAttendees] = useState(0);
  const [slug, setSlug] = useState("");
  const [jogosPorFase, setJogosPorFase] = useState(1);
  
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let novo;

    const torneioData: TorneioData = {
      nome,
      tipo,
      jogosPorFase,
      maximumAttendees,
      slug,
    };

    try {
      novo = await criarTorneio(torneioData);
      onCreated(novo.id)
      //alert("Torneio criado com sucesso!");
      alert(`DEBUG FRONT-END -> Nome: ${nome} | Tipo: ${tipo}`);
    } catch (error) {
      console.error("Erro ao criar torneio:", error);
      alert("Erro ao criar torneio.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex flex-col items-left justify-center gap-4 border-2 border-gray-300 rounded-lg p-4 ">

        <div className="flex gap-2 items-left">
          <p>NOME:</p>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-left">
          <p>TIPO DE TORNEIO:</p>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="LIGA">LIGA</option>
            <option value="COPA">COPA</option>
          </select>
        </div>

        <div className="flex gap-2 items-left">
          <p>NUMERO DE PARTICIPANTES:</p>
          <input
            type="number"
            placeholder="Numero de Participantes"
            value={maximumAttendees}
            onChange={(e) => setMaximumAttendees(Number(e.target.value))}
          />
        </div>

        <div className="flex gap-2 items-left">
          <p>JOGOS POR FASE:</p>
          <select
            value={jogosPorFase}
            onChange={(e) => setJogosPorFase(Number(e.target.value))}
          >
            <option value={1}>1 jogo por fase</option>
            <option value={2}>2 jogos por fase</option>
          </select>
        </div>

        <div className="flex gap-2 items-left">
          <p>SLUG:</p>
          <input
            type="text"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Criar Torneio
        </button>
      </form>
    </div>
  );
}

