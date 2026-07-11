"use client"
import { buscarJogosPorRodada } from "../api/repository/jogoRepository";
import { consultarTimePorId } from "../api/repository/timeRepository";
import { useState, useEffect } from "react";

export default function PartidasLiga ({id}: {id: string}){
    const [rodada, setRodada] = useState<number>(1)
    const [jogos, setJogos] = useState<any[]>()


    useEffect (() => {
        const jogosaux = async () => {
            const j = await buscarJogosPorRodada(id, rodada)
            setJogos(j)
        }
        jogosaux();
    },[id, rodada])

    return (
        <div>
            <div className="flex gap-4">
                <button onClick={() => {setRodada(rodada - 1)}}>ant</button>
                <p>Rodada {rodada}</p>
                <button onClick={() => {setRodada(rodada + 1)}}>prox</button>
            </div>
            {jogos?.map ((jogo) => (
                <Partida key = {jogo.id} jogo={jogo}/>
            )
        )}
        </div>
    )

}

interface jogoProps {
   jogo:
    {timeCasaId: string
    timeForaId: string}
}

function Partida ({jogo}: jogoProps){
    const [golsCasa, setGolsCasa] = useState <number> (0)
    const [golsFora, setGolsFora] = useState <number> (0)
    const [timeCasa, setTimeCasa] = useState <any> () 
    const [timeFora, setTimeFora] = useState <any> ()
    
    useEffect(() => {
        const carregarTimes = async () => {
          const dadosCasa = await consultarTimePorId(jogo.timeCasaId);
          const dadosFora = await consultarTimePorId(jogo.timeForaId);
          setTimeCasa(dadosCasa);
          setTimeFora(dadosFora);
        }
      
        carregarTimes();
      }, [jogo.timeCasaId, jogo.timeForaId]);

    return(
        <div className="flex gap-10">
            <div className="flex gap-3">
                {timeCasa?.nome}
                <div>
                    <button onClick={() => {setGolsCasa(golsCasa + 1)}}>+</button>
                    {golsCasa}
                    <button onClick={() => {setGolsCasa (golsCasa - 1)}}>-</button>
                </div>
            </div> 
            VS
            <div className="flex gap-3">
                <div>
                    <button onClick={() => {setGolsFora(golsFora + 1)}}>+</button>
                    {golsFora}
                    <button onClick={() => {setGolsFora (golsFora - 1)}}>-</button>
                </div>
                {timeFora?.nome}
            </div> 
        </div>
    )

}

