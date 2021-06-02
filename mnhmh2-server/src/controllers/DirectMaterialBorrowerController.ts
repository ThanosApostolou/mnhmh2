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
            let search = null;
            if (this.req.query["search"]) {
                search = this.req.query["search"].toString().trim();
            }
            let withMaterialTab = true;
            if (this.req.query["withMaterialTab"]) {
                withMaterialTab = (this.req.query["withMaterialTab"].toString().trim() === "true");
            }
            let withBorrower = true;
            if (this.req.query["withBorrower"]) {
                withBorrower = (this.req.query["withBorrower"].toString().trim() === "true");
            }
            let Id = null;
            if (this.req.query["Id"]) {
                Id = parseInt(this.req.query["Id"].toString().trim());
            }
            let notId = null;
            if (this.req.query["notId"]) {
                notId = parseInt(this.req.query["notId"].toString().trim());
            }
            let materialTabId = null;
            if (this.req.query["materialTabId"]) {
                materialTabId = parseInt(this.req.query["materialTabId"].toString().trim());
            }
            let notMaterialTabId = null;
            if (this.req.query["notMaterialTabId"]) {
                notMaterialTabId = parseInt(this.req.query["notMaterialTabId"].toString().trim());
            }
            let borrowerId = null;
            if (this.req.query["borrowerId"]) {
                borrowerId = parseInt(this.req.query["borrowerId"].toString().trim());
            }
            let notBorrowerId = null;
            if (this.req.query["notBorrowerId"]) {
                notBorrowerId = parseInt(this.req.query["notBorrowerId"].toString().trim());
            }
            const dmbs = await DirectMaterialBorrower.listSelectFromDB(Id, notId, search, withMaterialTab, withBorrower, materialTabId, notMaterialTabId, borrowerId, notBorrowerId);
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