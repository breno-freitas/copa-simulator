import { criarJogo } from "../repository/jogoRepository";
import { buscarFasePorId } from "../repository/faseRepository";
import { consultarTorneioPorId } from "../repository/torneioRepository";
import { atualizarJogo } from "../repository/jogoRepository";

export async function gerarJogo (timeCasaid: string, timeForaid: string, faseId: string) {
    const fase = await buscarFasePorId(faseId);
    if (!fase) {
        throw new Error("Fase não encontrada");
        console.error("Fase não encontrada");
    }

    const torneio = await consultarTorneioPorId(fase.torneioId);
    let jogo;
    if (!torneio) {
        throw new Error("Torneio não encontrado");
        console.error("Torneio não encontrado");
    }

    const jogoData = {
        timeCasaId: timeCasaid,
        timeForaId: timeForaid,
        faseId: fase.id,
        torneioId: fase.torneioId,
    };
    try {
         jogo = await criarJogo(jogoData);
         
    } catch (error) {
        console.error("Erro ao criar jogo", error);
        throw new Error("Erro ao criar jogo");
        return;
    }

    let jogo2;


    if (torneio.jogosPorFase === 2) {
    jogoData.timeCasaId = timeForaid;
    jogoData.timeForaId = timeCasaid;

    try {
        jogo2 = await criarJogo(jogoData);
        await atualizarJogo(jogo.id, { ...jogo, parId: jogo2.id });
        await atualizarJogo(jogo2.id, { ...jogo2, parId: jogo.id });
        return { jogo, jogo2 };
    } catch (error) {
        console.error("Erro ao criar jogo de volta", error);
        throw new Error("Erro ao criar jogo de volta");
        return;
    }
}

    return { jogo };
}
