'use server'
import { prisma } from "../../utils/prisma";

export type TorneioData = {
  nome: string;
  tipo: string;
  maximumAttendees: number;
  slug: string;
};

 
  export async function criarTorneio(data: TorneioData) {
    return prisma.torneio.create({ data });
  }

  export async function consultarTorneios() {
    return prisma.torneio.findMany();
  }

  export async function atualizarTorneio(id: string, data: TorneioData) {
    return prisma.torneio.update({ where: { id }, data });
  }

  export async function deletarTorneio(id: string) {
    return prisma.torneio.delete({ where: { id } });
  }

