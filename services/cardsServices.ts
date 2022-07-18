import { encrypt } from "../utils/ncrypt.js";
import { verifyCards } from "../repositories/cardsRepository.js";
import { newCard, getAllCards } from "../repositories/cardsRepository.js";

export async function newCardService(
    title: string,
    number: string,
    name: string,
    cvc: string,
    password: string,
    type: string,
    expirationDate: string,
    isVirtual: boolean,
    userId: number
) {
    const validateCard = await verifyCards(title, userId);

    if(validateCard != undefined) {
        throw { status: 409, message: "Card in use" };
    }

    const passwordEncrypted = encrypt(password);
    const cvcEncrypted = encrypt(cvc);
    const card : newCard = {
        number,
        title,
        userId,
        name,
        cvc: cvcEncrypted,
        password: passwordEncrypted,
        type,
        expirationDate,
        isVirtual
    };

    return card;
}

export async function verifyAllCards(userId: number) {
    const cards = await getAllCards(userId);
    if(cards == undefined) {
        throw { status: 404, message: "Cards not find" }; 
    }
    return cards;
}