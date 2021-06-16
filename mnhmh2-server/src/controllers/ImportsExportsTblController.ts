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
            /*let search = "";
            if (this.req.query["search"]) {
                search = this.req.query["search"].toString().trim();
            }
            const importsexportstbls = await ImportsExportsTbl.listSelectFromDB(search);*/

            let search = null;
            if (this.req.query["search"]) {
                search = this.req.query["search"].toString().trim();
            }
            let withMaterialTab = true;
            if (this.req.query["withMaterialTab"]) {
                withMaterialTab = (this.req.query["withMaterialTab"].toString().trim() === "true");
            }
            let Id = null;
            if (this.req.query["Id"]) {
                Id = parseInt(this.req.query["Id"].toString().trim());
            }
            let notId = null;
            if (this.req.query["notId"]) {
                notId = parseInt(this.req.query["notId"].toString().trim());
            }
            let fromDate = null;
            if (this.req.query["fromDate"]) {
                fromDate = this.req.query["fromDate"].toString().trim().replace("T", " ");
            }
            let toDate = null;
            if (this.req.query["toDate"]) {
                toDate = this.req.query["toDate"].toString().trim().replace("T", " ");
            }
            let materialTabId = null;
            if (this.req.query["materialTabId"]) {
                materialTabId = parseInt(this.req.query["materialTabId"].toString().trim());
            }
            let notMaterialTabId = null;
            if (this.req.query["notMaterialTabId"]) {
                notMaterialTabId = parseInt(this.req.query["notMaterialTabId"].toString().trim());
            }
            const importsexportstbls = await ImportsExportsTbl.listSelectFromDB(Id, notId, fromDate, toDate, search, withMaterialTab, materialTabId, notMaterialTabId);
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
            const importsexportstbl = ImportsExportsTbl.fromObject(body.importsexportstbl);
            //if (!importsexportstbl.Name || importsexportstbl.Name === null || importsexportstbl.Name === "") {
            //    this.res.status(422);
            //    this.res.setHeader("Content-Type", "application/json");
            //    this.res.send({error: "Name cannot be empty!"});
            //} else {
            importsexportstbl.Date = new Date(importsexportstbl.Date);
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
            const importsexportstbl = ImportsExportsTbl.fromObject(body.importsexportstbl);
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