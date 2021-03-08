import { Request, Response } from "express";

import { App } from "../App";
import { AmmunitionPortion } from "../entities/AmmunitionPortion";

export class AmmunitionPortionController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const portions = await AmmunitionPortion.listSelectFromDB();
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(AmmunitionPortion.listToJson(portions));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}