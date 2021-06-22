import { Request, Response } from "express";

import { App } from "../App";
import { AmmunitionStore } from "../entities/AmmunitionStore";
import { ErrorController } from "./ErrorController";

export class AmmunitionStoreController {
    req: Request = null;
    res: Response = null;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            let Id = null;
            if (this.req.query["Id"]) {
                Id = parseInt(this.req.query["Id"].toString().trim());
            }
            let notId = null;
            if (this.req.query["notId"]) {
                notId = parseInt(this.req.query["notId"].toString().trim());
            }
            let search = null;
            if (this.req.query["search"]) {
                search = this.req.query["search"].toString().trim();
            }
            const stores = await AmmunitionStore.listSelectFromDB(Id, notId, search);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(AmmunitionStore.listToJson(stores));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const store = AmmunitionStore.fromObject(body.store);
            if (!store.Name || store.Name === null || store.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else {
                await AmmunitionStore.insertToDB(store);
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
            await AmmunitionStore.deleteInDB(Id);
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
            const store = AmmunitionStore.fromObject(body.store);
            if (!store.Name || store.Name === null || store.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else {
                await AmmunitionStore.updateInDB(store);
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