import { criarTime } from "../api/repository/timeRepository";
import { TimeData } from "../api/repository/timeRepository";
import { useState, useEffect } from "react";
import { verificarTime } from "../api/repository/timeRepository";
import { consultarTimesPorTorneio } from "../api/repository/timeRepository";
import { excluirTime } from "../api/repository/timeRepository";
import { Time } from "../generated/prisma";

type Props = {id: string}

export default function AddTime ({id}: Props) {

    const [nome, setNome] = useState ("")
    const [torneioId, setTorneioId] = useState<string> ("")
    const [timeList, setTimeList] = useState<Time[] | null> ([])

    const handleGetTimes = async () => {
        const times = await consultarTimesPorTorneio(id)
        setTimeList (times)
        console.log(times)
    }
    
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();


        const timeData: TimeData = {
            nome,
            torneioId: id
        };

        
        try {
            const verify = await verificarTime(timeData.torneioId, timeData.nome);
      
            if (!verify) {
              await criarTime(timeData);
              alert("Time adicionado");
              handleGetTimes();
            } else {
              alert("Este campeonato já possui um time com este nome");
            }
          } catch (error) {
            console.error("Erro ao criar time", error);
            alert("Erro inesperado ao criar time");
          }
        };

        const handleDeleteTime = async (id: string) => {
            try {
                const apagar = await excluirTime(id);
                alert("time apagado")
                console.log(apagar);
                handleGetTimes();
            } catch (error) {
                console.error("erro ao apagar time", error)
                alert ("erro ao deletar time")
            }
        }
        
        

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
            <div>
                <p>TIMES:</p>
                {timeList?.map(time => (
                    <div key={time.id} className= "flex">
                        <p>{time.nome}</p>
                        <button onClick={() => handleDeleteTime(time.id)}>Apagar</button>
                    </div>
                ))}
            </div>
        </div>
    )

}