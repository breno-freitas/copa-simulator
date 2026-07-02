import { prisma } from "../../utils/prisma";
import {consultarTorneioPorId} from "../repository/torneioRepository";

function calcularFase(qtd: number) {
    const numfase = Math.sqrt(qtd);

    if (numfase < 2) {
        return "Final"
    }
    else if (numfase === 4) {
        return "Semifinal"
    }
    else if (numfase === 8) {
        return "Quartas de Final"
    }
    else if (numfase === 16) {
        return "Oitavas de Final"
    }
    else {
        return "{numfase}-avos de Final"
    }

}

export async function gerarFase(torneioId: string) {
    
    const torneio = await consultarTorneioPorId(torneioId);

    if (!torneio) {
        throw new Error("Torneio não encontrado");
    }

    if (!torneio.fase) {
        const qtd = torneio.maximumAttendees;
        const nomeFase = calcularFase(qtd);

        


        
    }

}