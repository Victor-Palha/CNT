-- CreateEnum
CREATE TYPE "TypeCard" AS ENUM ('OFENSIVA', 'DEFENSIVA', 'HABILIDADE', 'HABILIDADE_UNICA');

-- CreateEnum
CREATE TYPE "TypeAvatar" AS ENUM ('OFENSIVO', 'DEFENSIVO', 'MODERADO');

-- CreateTable
CREATE TABLE "players" (
    "id_player" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id_player")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id_card" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "set_card" TEXT NOT NULL,
    "type_card" "TypeCard" NOT NULL,
    "list" INTEGER NOT NULL DEFAULT 3,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id_card")
);

-- CreateTable
CREATE TABLE "Avatars" (
    "id_avatar" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "set_avatar" TEXT NOT NULL,
    "unique_ability" TEXT NOT NULL,
    "passive_ability" TEXT,
    "hit_points" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "type_avatar" "TypeAvatar" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avatars_pkey" PRIMARY KEY ("id_avatar")
);

-- CreateTable
CREATE TABLE "CardsDeck" (
    "deck_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,

    CONSTRAINT "CardsDeck_pkey" PRIMARY KEY ("deck_id","card_id")
);

-- CreateTable
CREATE TABLE "decks" (
    "id_deck" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "avatar_id" TEXT NOT NULL,

    CONSTRAINT "decks_pkey" PRIMARY KEY ("id_deck")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_username_key" ON "players"("username");

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- AddForeignKey
ALTER TABLE "CardsDeck" ADD CONSTRAINT "CardsDeck_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks"("id_deck") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsDeck" ADD CONSTRAINT "CardsDeck_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards"("id_card") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decks" ADD CONSTRAINT "decks_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id_player") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decks" ADD CONSTRAINT "decks_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "Avatars"("id_avatar") ON DELETE RESTRICT ON UPDATE CASCADE;
