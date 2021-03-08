import { Request, Response } from "express";

import { App } from "../App";
import { AmmunitionStore } from "../entities/AmmunitionStore";

export class AmmunitionStoreController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const stores = await AmmunitionStore.listSelectFromDB();
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(AmmunitionStore.listToJson(stores));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}