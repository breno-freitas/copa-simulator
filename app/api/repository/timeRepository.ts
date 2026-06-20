import { prisma } from "../../utils/prisma";

export type TimeData = {
  nome: string;
  torneioId: string;
};

export async function criarTime(data: TimeData) {
  return prisma.time.create({ data });
}

export async function consultarTimes() {
  return prisma.time.findMany();
}

export async function atualizarTime(id: string, data: TimeData) {
  return prisma.time.update({ where: { id }, data });
}

export async function excluirTime(id: string) {
  return prisma.time.delete({ where: { id } });
}