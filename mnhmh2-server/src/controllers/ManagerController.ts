import { Request, Response } from "express";

import { App } from "../App";
import { Manager } from "../entities/Manager";

export class ManagerController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const managers = await Manager.listSelectFromDB();
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Manager.listToJson(managers));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}