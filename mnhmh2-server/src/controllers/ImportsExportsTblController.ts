import { Request, Response } from "express";

import { ImportsExportsTbl } from "../entities/ImportsExportsTbl";

export class ImportsExportsTblController {
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
            const importsexportstbls = await ImportsExportsTbl.listSelectFromDB(search);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(ImportsExportsTbl.listToJson(importsexportstbls));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const importsexportstbl = ImportsExportsTbl.fromObject(body.group);
            //if (!importsexportstbl.Name || importsexportstbl.Name === null || importsexportstbl.Name === "") {
            //    this.res.status(422);
            //    this.res.setHeader("Content-Type", "application/json");
            //    this.res.send({error: "Name cannot be empty!"});
            //} else {
            await ImportsExportsTbl.insertToDB(importsexportstbl);
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
            await ImportsExportsTbl.deleteInDB(Id);
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
            const importsexportstbl = ImportsExportsTbl.fromObject(body.group);
            //if (!importsexportstbl.Name || importsexportstbl.Name === null || importsexportstbl.Name === "") {
            //    this.res.status(422);
            //    this.res.setHeader("Content-Type", "application/json");
            //    this.res.send({error: "Name cannot be empty!"});
            //} else {
            await ImportsExportsTbl.updateInDB(importsexportstbl);
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