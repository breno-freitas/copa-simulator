/*
  Warnings:

  - Added the required column `numero` to the `Fase` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "torneioId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    CONSTRAINT "Fase_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fase" ("id", "nome", "torneioId") SELECT "id", "nome", "torneioId" FROM "Fase";
DROP TABLE "Fase";
ALTER TABLE "new_Fase" RENAME TO "Fase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
