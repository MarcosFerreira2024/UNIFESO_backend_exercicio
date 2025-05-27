/*
  Warnings:

  - Added the required column `descricao` to the `Produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "preco" INTEGER NOT NULL,
    "estoque" INTEGER NOT NULL
);
INSERT INTO "new_Produtos" ("estoque", "id", "nome", "preco") SELECT "estoque", "id", "nome", "preco" FROM "Produtos";
DROP TABLE "Produtos";
ALTER TABLE "new_Produtos" RENAME TO "Produtos";
CREATE UNIQUE INDEX "Produtos_nome_key" ON "Produtos"("nome");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
