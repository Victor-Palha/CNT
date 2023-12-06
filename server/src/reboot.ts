import { readFileSync } from "fs";
import { prisma } from "../lib/prisma";

async function reboot(){
    const cards = JSON.parse(readFileSync(__dirname + "/../data/cards.local.json", "utf-8"));
    const avatars = JSON.parse(readFileSync(__dirname + "/../data/avatares.local.json", "utf-8"));
    await prisma.cards.createMany({
        data: cards
    })

    await prisma.avatars.createMany({
        data: avatars
    })
    
    console.log("Rebooted 🤡");
}

reboot();