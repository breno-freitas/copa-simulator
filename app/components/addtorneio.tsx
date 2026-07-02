import { criarTorneio } from "../api/repository/torneioRepository";
import { TorneioData } from "../api/repository/torneioRepository";
import { useState } from "react";
import { gerarFase } from "../api/service/geradorFase";
import { gerarJogoCopa } from "../api/service/geradorJogos";

type Props = { onCreated: (id: string) => void };

export default function AddTorneio({onCreated}: Props) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [maximumAttendees, setMaximumAttendees] = useState(0);
  const [slug, setSlug] = useState("");
  const [jogosPorFase, setJogosPorFase] = useState(1);
  
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let novo;

    const torneioData: TorneioData = {
      nome,
      tipo: tipo as 'LIGA' | 'COPA',
      jogosPorFase,
      maximumAttendees,
      slug,
    };

    try {
      novo = await criarTorneio(torneioData);
      onCreated(novo.id)
      alert("Torneio criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar torneio:", error);
      alert("Erro ao criar torneio.");
    }

    if (novo) {
      if (novo.tipo === "COPA") {
        try {
          await gerarFase(novo.id);
          alert("Fase inicial gerada com sucesso!");
        } catch (error) {
          console.error("Erro ao gerar fase:", error);
          alert("Erro ao gerar fase.");
        }
      }

      else if (novo.tipo === "LIGA") {

      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="LIGA">LIGA</option>
        <option value="COPA">COPA</option>
      </select>

      <input
        type="number"
        placeholder="Máximo de Participantes"
        value={maximumAttendees}
        onChange={(e) => setMaximumAttendees(Number(e.target.value))}
      />

      <select
        value={jogosPorFase}
        onChange={(e) => setJogosPorFase(Number(e.target.value))}
      >
        <option value={1}>1 jogo por fase</option>
        <option value={2}>2 jogos por fase</option>
      </select>
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <button type="submit">Criar Torneio</button>
    </form>
  );
}
      function consultarTimesPorTorneio(id: string) {
        throw new Error("Function not implemented.");
      }

