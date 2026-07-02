'use server'
import { prisma } from "../../utils/prisma";

type TipoTorneio = 'LIGA' | 'COPA';

export type TorneioData = {
  nome: string;
  tipo: TipoTorneio;
  maximumAttendees: number;
  slug: string;
  jogosPorFase: number;
};

 
  export async function criarTorneio(data: TorneioData) {
    return prisma.torneio.create({ data });
  }

  export async function consultarTorneios() {
    return prisma.torneio.findMany();
  }

  export async function consultarTorneioPorId(id: string) {
    return prisma.torneio.findUnique({ where: { id } });
  }

  export async function atualizarTorneio(id: string, data: TorneioData) {
    return prisma.torneio.update({ where: { id }, data });
  }

  export async function deletarTorneio(id: string) {
    return prisma.torneio.delete({ where: { id } });
  }

