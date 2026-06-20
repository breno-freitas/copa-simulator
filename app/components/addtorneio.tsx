import { criarTorneio } from "../api/repository/torneioRepository";
import { TorneioData } from "../api/repository/torneioRepository";
import { useState } from "react";

export default function AddTorneio() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [maximumAttendees, setMaximumAttendees] = useState(0);
  const [slug, setSlug] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const torneioData: TorneioData = {
      nome,
      tipo,
      maximumAttendees,
      slug,
    };

    try {
      await criarTorneio(torneioData);
      alert("Torneio criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar torneio:", error);
      alert("Erro ao criar torneio.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Máximo de Participantes"
        value={maximumAttendees}
        onChange={(e) => setMaximumAttendees(Number(e.target.value))}
      />
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