import { Request, Response } from 'express';
import { insert } from '../repositories/wifiRepository.js';
import { newWifiService, verifyAllWifi } from '../services/wifiServices.js';

export async function newWifiController(req: Request, res: Response) {
    const { title, name, password } : { title: string, name: string, password: string } = req.body;
    const { userId } = res.locals.userId;
    const wifi = await newWifiService(title, password, name, userId);
    try {
        await insert(wifi);
        return res.status(201).send("Wi-fi successfully registered")
    } catch(error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export async function getAllWifiController(req: Request, res: Response) {
    const { userId } = res.locals.userId;
    const wifi = await verifyAllWifi(userId)
    return res.status(200).send(wifi);
}