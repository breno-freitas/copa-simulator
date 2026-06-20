import { PrismaClient } from '../app/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  const slug = `torneio-test-${Date.now()}`;
  const data = {
    nome: 'Torneio de Teste',
    tipo: 'amistoso',
    maximumAttendees: 16,
    slug,
  };

  const torneio = await prisma.torneio.create({ data });
  console.log('Criado torneio:', torneio);
}

main()
  .catch((e) => {
    console.error('Erro durante teste:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
