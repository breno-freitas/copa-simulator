/*
  Warnings:

  - You are about to drop the `Partida` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `faseId` to the `Jogo` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Partida";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Torneio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "jogosPorFase" INTEGER NOT NULL DEFAULT 1,
    "slug" TEXT NOT NULL,
    "maximumAttendees" INTEGER NOT NULL
);
INSERT INTO "new_Torneio" ("id", "maximumAttendees", "nome", "slug", "tipo") SELECT "id", "maximumAttendees", "nome", "slug", "tipo" FROM "Torneio";
DROP TABLE "Torneio";
ALTER TABLE "new_Torneio" RENAME TO "Torneio";
CREATE UNIQUE INDEX "Torneio_slug_key" ON "Torneio"("slug");
CREATE TABLE "new_Jogo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "torneioId" TEXT NOT NULL,
    "partidaId" TEXT,
    "rodada" INTEGER,
    "faseId" TEXT NOT NULL,
    "timeCasaId" TEXT NOT NULL,
    "timeForaId" TEXT NOT NULL,
    "golsCasa" INTEGER NOT NULL DEFAULT 0,
    "golsFora" INTEGER NOT NULL DEFAULT 0,
    "parId" TEXT,
    "vencedorId" TEXT,
    CONSTRAINT "Jogo_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jogo_faseId_fkey" FOREIGN KEY ("faseId") REFERENCES "Fase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Jogo" ("golsCasa", "golsFora", "id", "partidaId", "rodada", "timeCasaId", "timeForaId", "torneioId") SELECT "golsCasa", "golsFora", "id", "partidaId", "rodada", "timeCasaId", "timeForaId", "torneioId" FROM "Jogo";
DROP TABLE "Jogo";
ALTER TABLE "new_Jogo" RENAME TO "Jogo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
