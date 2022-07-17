import prisma from "../database.js";
import { notes } from "@prisma/client";
import { decrypt } from "../utils/ncrypt.js";

export type newNotes = Omit<notes, "id" | "creatAt">;

export async function insert(note: newNotes) {
    await prisma.notes.create({data: note});
}

export async function verifyNote(title: string, userId: number) { 
    const noteInfos = await prisma.notes.findFirst({where: {title: {equals: title, mode: 'insensitive'}, userId: userId}});
    return noteInfos;
}

export async function getAllNotes(userId: number) {
    const notes = await prisma.notes.findMany({where: {userId: userId}});
    if(notes) {
        const notesList = notes.map((note) => {
            const textDecrypted = decrypt(note.text)
            return ({...note, text: textDecrypted});
        });
        return notesList;
    }
    return notes;
}
