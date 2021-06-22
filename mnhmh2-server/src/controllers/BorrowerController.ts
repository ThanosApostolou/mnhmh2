import { Request, Response } from "express";

import { Borrower } from "../entities/Borrower";
import { ErrorController } from "./ErrorController";

export class BorrowerController {
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
            let withManager = true;
            if (this.req.query["withManager"]) {
                withManager = (this.req.query["withManager"].toString().trim() === "true");
            }
            let Id = null;
            if (this.req.query["Id"]) {
                Id = parseInt(this.req.query["Id"].toString().trim());
            }
            let notId = null;
            if (this.req.query["notId"]) {
                notId = parseInt(this.req.query["notId"].toString().trim());
            }
            let managerId = null;
            if (this.req.query["managerId"]) {
                managerId = parseInt(this.req.query["managerId"].toString().trim());
            }
            let notManagerId = null;
            if (this.req.query["notManagerId"]) {
                notManagerId = parseInt(this.req.query["notManagerId"].toString().trim());
            }
            const borrowers = await Borrower.listSelectFromDB(Id, notId, search, withManager, managerId, notManagerId);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Borrower.listToJson(borrowers));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const borrower = Borrower.fromObject(body.borrower);
            if (!borrower.Name || borrower.Name === null || borrower.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else {
                await Borrower.insertToDB(borrower);
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
            await Borrower.deleteInDB(Id);
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
            const borrower = Borrower.fromObject(body.borrower);
            if (!borrower.Name || borrower.Name === null || borrower.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else {
                await Borrower.updateInDB(borrower);
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