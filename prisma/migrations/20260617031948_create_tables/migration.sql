-- CreateTable
CREATE TABLE "Torneio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "maximumAttendees" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Time" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "vitorias" INTEGER NOT NULL DEFAULT 0,
    "derrotas" INTEGER NOT NULL DEFAULT 0,
    "empates" INTEGER NOT NULL DEFAULT 0,
    "golsPro" INTEGER NOT NULL DEFAULT 0,
    "golsContra" INTEGER NOT NULL DEFAULT 0,
    "torneioId" TEXT NOT NULL,
    CONSTRAINT "Time_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Jogo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "torneioId" TEXT NOT NULL,
    "partidaId" TEXT,
    "rodada" INTEGER,
    "timeCasaId" TEXT NOT NULL,
    "timeForaId" TEXT NOT NULL,
    "golsCasa" INTEGER NOT NULL DEFAULT 0,
    "golsFora" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Jogo_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "Partida" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Jogo_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Partida" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "faseId" TEXT NOT NULL,
    "vencedorId" TEXT,
    CONSTRAINT "Partida_faseId_fkey" FOREIGN KEY ("faseId") REFERENCES "Fase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "torneioId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    CONSTRAINT "Fase_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Torneio_slug_key" ON "Torneio"("slug");
