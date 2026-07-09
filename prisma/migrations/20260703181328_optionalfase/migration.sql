-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jogo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "torneioId" TEXT NOT NULL,
    "partidaId" TEXT,
    "rodada" INTEGER,
    "faseId" TEXT,
    "timeCasaId" TEXT NOT NULL,
    "timeForaId" TEXT NOT NULL,
    "golsCasa" INTEGER NOT NULL DEFAULT 0,
    "golsFora" INTEGER NOT NULL DEFAULT 0,
    "parId" TEXT,
    "vencedorId" TEXT,
    CONSTRAINT "Jogo_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jogo_faseId_fkey" FOREIGN KEY ("faseId") REFERENCES "Fase" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Jogo" ("faseId", "golsCasa", "golsFora", "id", "parId", "partidaId", "rodada", "timeCasaId", "timeForaId", "torneioId", "vencedorId") SELECT "faseId", "golsCasa", "golsFora", "id", "parId", "partidaId", "rodada", "timeCasaId", "timeForaId", "torneioId", "vencedorId" FROM "Jogo";
DROP TABLE "Jogo";
ALTER TABLE "new_Jogo" RENAME TO "Jogo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
