import { prisma } from "../../utils/prisma";

export type jogoData = {
  timeCasaId: string;
  timeForaId: string;
  faseId: string;
  torneioId: string;
  parId?: string | null;
};

export async function criarJogo(data: jogoData) {
  return prisma.jogo.create({ data });
}

export async function consultarJogos() {
  return prisma.jogo.findMany();
}

export async function buscarJogoPorId(id: string) {
  return prisma.jogo.findUnique({ where: { id } });
}

export async function atualizarJogo(id: string, data: jogoData) {
  return prisma.jogo.update({ where: { id }, data });
}

export async function excluirJogo(id: string) {
  return prisma.jogo.delete({ where: { id } });
}
