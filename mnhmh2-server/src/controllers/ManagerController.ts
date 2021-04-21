import { Request, Response } from "express";
import {Like} from "typeorm";

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
            this.res.setHeader("Content-Type", "application/json");
            let search = "";
            if (this.req.query["search"]) {
                search = this.req.query["search"].toString().trim();
            }
            if (this.req.query["id"]) {
                const id = parseInt(this.req.query["id"].toString().trim());
                const manager = await Manager.selectById(id);
                this.res.send(manager.toJson());
                return;
            }
            const managers = await Manager.listSelectFromDB(search);
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
            const manager = Manager.fromObject(body.manager);
            if (!manager.Name || manager.Name === null || manager.Name === "") {
                this.res.status(422);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({error: "Name cannot be empty!"});
            } else {
                await Manager.insertToDB(manager);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({message: "OK"});
            }
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
    async DELETE(): Promise<void> {
        try {
            const body = this.req.body;
            const Id: number = body.Id;
            await Manager.deleteInDB(Id);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send({message: "OK"});
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
    async PUT(): Promise<void> {
        try {
            const body = this.req.body;
            const manager = Manager.fromObject(body.manager);
            if (!manager.Name || manager.Name === null || manager.Name === "") {
                this.res.status(422);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({error: "Name cannot be empty!"});
            } else {
                await Manager.updateInDB(manager);
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