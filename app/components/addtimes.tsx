import { criarTime } from "../api/repository/timeRepository";
import { TimeData } from "../api/repository/timeRepository";
import { useState } from "react";
import { verificarTime } from "../api/repository/timeRepository";

type Props = {id: string}

export default function AddTime ({id}: Props) {

    const [nome, setNome] = useState ("")
    const [torneioId, setTorneioId] = useState<string> ("")

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        setTorneioId(id)
        
        const timeData: TimeData = {
            nome,
            torneioId
        };


        try {
            const verify = await verificarTime(timeData.torneioId, timeData.nome);
      
            if (!verify) {
              await criarTime(timeData);
              alert("Time adicionado");
            } else {
              alert("Este campeonato já possui um time com este nome");
            }
          } catch (error) {
            console.error("Erro ao criar time", error);
            alert("Erro inesperado ao criar time");
          }
        };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="nome do time"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}/>
                    <button type="submit">Adicionar</button>
            </form>
        </div>
    )

}