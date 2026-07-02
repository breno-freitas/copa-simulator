import { prisma } from "../../utils/prisma";

export type FaseData = {
    nome: string;
    torneioId: string;
    numero: number;
}

export async function criarFase(data: FaseData) {
    return prisma.fase.create({ data });
}

export async function consultarFases() {
    return prisma.fase.findMany();
}

export async function consultarFasesPorTorneio(torneioId: string) {
    return prisma.fase.findMany({ where: { torneioId } });
}

export async function buscarFasePorId(id: string) {
    return prisma.fase.findUnique({ where: { id } });
}

export async function atualizarFase (id: string, data: FaseData){
    return prisma.fase.update({ where: {id}, data })
}

export async function excluirFase(id: string) {
    return prisma.fase.delete({ where: {id} })
}