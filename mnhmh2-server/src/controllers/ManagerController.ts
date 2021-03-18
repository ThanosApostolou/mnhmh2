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
            const search = this.req.query["search"].toString().trim();
            const managers = await Manager.listSelectFromDB(search);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Manager.listToJson(managers));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const managerobj = Manager.fromObject(body.manager);
            if (!managerobj.Name || managerobj.Name === null || managerobj.Name === "") {
                this.res.status(422);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({error: "Name cannot be empty!"});
            } else {
                await Manager.toDB(managerobj);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({message: "OK"});
            }
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}