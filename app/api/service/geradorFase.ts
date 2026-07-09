"use server"
import { prisma } from "../../utils/prisma";
import {consultarTorneioPorId} from "../repository/torneioRepository";
import {consultarFasesPorTorneio} from "../repository/faseRepository";
import {consultarTimesPorTorneio} from "../repository/timeRepository";
import {gerarJogoCopa} from "./geradorJogos";
import {criarFase} from "../repository/faseRepository";
import { consultarJogosPorFase } from "../repository/jogoRepository";

function calcularFase(numfase: number) {

    if (numfase === 1) {
        return "Final"
    }
    else if (numfase === 2) {
        return "Semifinal"
    }
    else if (numfase === 4) {
        return "Quartas de Final"
    }
    else if (numfase === 8) {
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

    const fases = await consultarFasesPorTorneio(torneioId);

    if (!fases || fases.length === 0) {
        const qtd = torneio.maximumAttendees;
        const numfase = qtd/2;
        const nomeFase = calcularFase(numfase);
        const faseData = {
            nome: nomeFase,
            torneioId: torneioId,
            numero: numfase
        };

        const fase = await criarFase(faseData);

        const times = await consultarTimesPorTorneio(torneioId);

        times.map(async (time, index) => {
            if (index % 2 === 0) {
                const timeCasa = time;
                const timeFora = times[index + 1];
                await gerarJogoCopa(timeCasa.id, timeFora.id, fase.id);
            }
        });
    }

    else {
        const ultimaFase = fases[fases.length - 1];
        const atual = ultimaFase.numero/2;
        const nomeFase = calcularFase(atual);
        const faseData = {
            nome: nomeFase,
            torneioId: torneioId,
            numero: atual
        };
        const fase = await criarFase(faseData);

        if (!fase) {
            throw new Error("Erro ao criar fase");
            return;
        }

        const jogosanterior = await consultarJogosPorFase(ultimaFase.id);
        const times = jogosanterior.map(jogo => jogo.vencedorId);

        times.map(async (time, index) => {
            if (index % 2 === 0) {
                const timeCasaId = time;
                if (!timeCasaId) {
                    throw new Error("Time da casa não encontrado");
                }
                const timeForaId = times[index + 1];
                if (!timeForaId) {
                    throw new Error("Time da fora não encontrado");
                }
                await gerarJogoCopa(timeCasaId, timeForaId, fase.id);
            }
        });
    }
}