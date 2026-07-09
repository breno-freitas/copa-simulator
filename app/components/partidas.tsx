import { buscarJogosPorRodada } from "../api/repository/jogoRepository";
import { consultarTimePorId } from "../api/repository/timeRepository";
import { useState, useEffect } from "react";

export default function partidasLiga ({id}: {id: string}){
    const [rodada, setRodada] = useState<number>(1)
    
    const jogos = async () => {
        const j = buscarJogosPorRodada(id, rodada)
        return j
    }

}

