import { Request, Response } from "express";

import { App } from "../App";
import { MaterialTab } from "../entities/MaterialTab";

export class MaterialTabController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const materialtabs = await MaterialTab.listSelectFromDB();
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(MaterialTab.listToJson(materialtabs));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}