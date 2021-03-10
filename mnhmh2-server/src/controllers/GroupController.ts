import { Request, Response } from "express";

import { App } from "../App";
import { Group } from "../entities/Group";

export class GroupController {
    req: Request = null;
    res: Response = null;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const groups = await Group.listSelectFromDB(null);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Group.listToJson(groups));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}