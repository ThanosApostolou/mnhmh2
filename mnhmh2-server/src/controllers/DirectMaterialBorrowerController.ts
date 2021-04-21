import { Request, Response } from "express";

import { DirectMaterialBorrower } from "../entities/DirectMaterialBorrower";

export class DirectMaterialBorrowerController {
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
            const dmbs = await DirectMaterialBorrower.listSelectFromDB(search);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(DirectMaterialBorrower.listToJson(dmbs));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const dmb = DirectMaterialBorrower.fromObject(body.directMaterialBorrower);
            //if (!dmb.Name || dmb.Name === null || dmb.Name === "") {
            //    this.res.status(422);
            //    this.res.setHeader("Content-Type", "application/json");
            //    this.res.send({error: "Name cannot be empty!"});
            //} else {
            await DirectMaterialBorrower.insertToDB(dmb);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send({message: "OK"});
            //}
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
            await DirectMaterialBorrower.deleteInDB(Id);
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
            const dmb = DirectMaterialBorrower.fromObject(body.directMaterialBorrower);
            //if (!dmb.Name || dmb.Name === null || dmb.Name === "") {
            //    this.res.status(422);
            //    this.res.setHeader("Content-Type", "application/json");
            //    this.res.send({error: "Name cannot be empty!"});
            //} else {
            await DirectMaterialBorrower.updateInDB(dmb);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send({message: "OK"});
            //}
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}