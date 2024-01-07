/*
  Warnings:

  - The primary key for the `CardsDeck` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id_cards_deck` was added to the `CardsDeck` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "CardsDeck" DROP CONSTRAINT "CardsDeck_pkey",
ADD COLUMN     "id_cards_deck" TEXT NOT NULL,
ADD CONSTRAINT "CardsDeck_pkey" PRIMARY KEY ("id_cards_deck");
