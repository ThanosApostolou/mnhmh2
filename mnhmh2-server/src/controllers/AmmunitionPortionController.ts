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
            let search = "";
            if (this.req.query["search"]) {
                search = this.req.query["search"].toString().trim();
            }
            const portions = await AmmunitionPortion.listSelectFromDB(search);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(AmmunitionPortion.listToJson(portions));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const portion = AmmunitionPortion.fromObject(body.group);
            if (!portion.Name || portion.Name === null || portion.Name === "") {
                this.res.status(422);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({error: "Name cannot be empty!"});
            } else {
                await AmmunitionPortion.insertToDB(portion);
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
            await AmmunitionPortion.deleteInDB(Id);
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
            const portion = AmmunitionPortion.fromObject(body.group);
            if (!portion.Name || portion.Name === null || portion.Name === "") {
                this.res.status(422);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({error: "Name cannot be empty!"});
            } else {
                await AmmunitionPortion.updateInDB(portion);
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