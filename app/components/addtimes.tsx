import { criarTime } from "../api/repository/timeRepository";
import { TimeData } from "../api/repository/timeRepository";
import { useState, useEffect } from "react";
import { verificarTime } from "../api/repository/timeRepository";
import { consultarTimesPorTorneio } from "../api/repository/timeRepository";
import { excluirTime } from "../api/repository/timeRepository";
import { Time } from "../generated/prisma";
import { gerarFase } from "../api/service/geradorFase";
import { gerarTabelaLiga } from "../api/service/geradorJogos";
import { consultarTorneioPorId } from "../api/repository/torneioRepository";
import link from "next/link";
import { useRouter } from "next/navigation";

type Props = {id: string}

export default function AddTime ({id}: Props) {

    const [nome, setNome] = useState ("")
    const [torneioId, setTorneioId] = useState<string> ("")
    const [timeList, setTimeList] = useState<Time[] | null> ([])
    const router = useRouter();
    const [numtimes, setNumTimes] = useState<number>(0);
    const [maximumAttendees, setMaximumAttendees] = useState<number>(0);

    async function maximumAttendeesTorneio() {
        let torneio
        try {
            torneio = await consultarTorneioPorId(id);
        }
        catch (error) {
            console.error("Erro ao consultar torneio", error);
            alert("Erro ao consultar torneio");
            return;
        }
        if (!torneio) {
            alert("Torneio não encontrado");
            return;
        }
        setMaximumAttendees(torneio.maximumAttendees);
    }

    maximumAttendeesTorneio();

    const handleGetTimes = async () => {
        const times = await consultarTimesPorTorneio(id)
        setTimeList (times)
        setNumTimes (times.length)
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
        
        const handleFinalizar = async () => {
            let torneio
            console.log("Finalizando torneio com ID:", id);

            try {
                torneio = await consultarTorneioPorId(id);
                console.log("Torneio consultado:", torneio);
            }
            catch (error) {
                console.error("Erro ao consultar torneio", error);
                alert("Erro ao consultar torneio");
                return;
            }

            if (!torneio) {
                alert("Torneio não encontrado");
                return;
            }

            if (torneio.tipo === "COPA") {
                try {
                    await gerarFase(torneio.id);
                    alert("Fase inicial gerada com sucesso!");
                    
                }
                catch (error) {
                    console.error("Erro ao gerar fase", error);
                    alert("Erro ao gerar fase");
                }
            }

            else if (torneio.tipo === "LIGA") {
                console.log("Gerando tabela de jogos para torneio do tipo LIGA com ID:", torneio.id);
                try {
                    await gerarTabelaLiga(torneio.id);
                    alert("Tabela de jogos gerada com sucesso!");
                    console.log("Tabela de jogos gerada com sucesso!");
                }
                catch (error) {
                    console.error("Erro ao gerar tabela de jogos", error);
                    alert("Erro ao gerar tabela de jogos");
                }
            }

            router.push(`/campeonatos/${torneio.id}/`);
        }
        
        

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 backdrop-blur-sm">
            <div className="flex flex-col items-left justify-center gap-4 border-2 border-gray-300 rounded-lg p-4 gap-4">
                <div>
                    <p>TIMES:</p>
                    {timeList?.map(time => (
                        <div key={time.id} className= "flex">
                            <p>{time.nome}</p>
                            <button onClick={() => handleDeleteTime(time.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-20">
                                Apagar
                            </button>
                        </div>
                    ))}
                    <p className="text-lg font-bold flex">{numtimes}/{maximumAttendees}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="nome do time"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}/>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Adicionar
                        </button>
                </form>

                <div className="flex gap-2 text-align-center items-center">
                    <button onClick={handleFinalizar} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Finalizar
                    </button>
                </div>
            </div>
        </div>
    )

}