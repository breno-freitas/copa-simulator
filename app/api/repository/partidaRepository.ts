import { prisma } from "../../utils/prisma";

export type PartidaData = {
    faseId: string;
}

export async function criarPartida(data: PartidaData) {
    return prisma.partida.create({ data });
}

export async function consultarPartidas() {
    return prisma.partida.findMany();
}

export async function buscarPartidaPorId(id: string) {
    return prisma.partida.findUnique({ where: { id } });
}

export async function atualizarPartida(id: string, data: PartidaData) {
    return prisma.partida.update({ where: { id }, data });
}

export async function excluirPartida(id: string) {
    return prisma.partida.delete({ where: { id } });
}
