import { Request, Response } from "express";

import { ImportsExportsTbl } from "../entities/ImportsExportsTbl";
import { ErrorController } from "./ErrorController";

export class ImportsExportsTblController {
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

            if (importsexportstbl.Date === undefined || importsexportstbl.Date === null || importsexportstbl.Date.toString() === "") {
                ErrorController.sendError(this.res, 422,"Η ημερομηνία δεν μπορεί να είναι κενή");
            } else if (importsexportstbl.Imported === undefined || importsexportstbl.Imported === null) {
                ErrorController.sendError(this.res, 422,"Οι εισαγωγές δεν μπορεί να είναι κενές");
            } else if (!Number.isInteger(Number(importsexportstbl.Imported))) {
                ErrorController.sendError(this.res, 422,"Οι εισαγωγές πρέπει να είναι ακέραιος αριθμός");
            } else if (importsexportstbl.Imported < 0) {
                ErrorController.sendError(this.res, 422,"Οι εισαγωγές πρέπει να είναι θετικός αριθμός");
            } else if (importsexportstbl.Exported === undefined || importsexportstbl.Exported === null) {
                ErrorController.sendError(this.res, 422,"Οι εξαγωγές δεν μπορεί να είναι κενές");
            } else if (!Number.isInteger(Number(importsexportstbl.Exported))) {
                ErrorController.sendError(this.res, 422,"Οι εξαγωγές πρέπει να είναι ακέραιος αριθμός");
            } else if (importsexportstbl.Exported < 0) {
                ErrorController.sendError(this.res, 422,"Οι εξαγωγές πρέπει να είναι θετικός αριθμός");
            } else if (importsexportstbl.Remaining === undefined || importsexportstbl.Remaining === null) {
                ErrorController.sendError(this.res, 422,"Το υπόλοιπο δεν μπορεί να είναι κενές");
            } else if (!Number.isInteger(Number(importsexportstbl.Remaining))) {
                ErrorController.sendError(this.res, 422,"Το υπόλοιπο πρέπει να είναι ακέραιος αριθμός");
            } else if (importsexportstbl.Remaining < 0) {
                ErrorController.sendError(this.res, 422,"Το υπόλοιπο πρέπει να είναι θετικός αριθμός");
            } else if (importsexportstbl.MaterialTab === undefined || importsexportstbl.MaterialTab === null) {
                ErrorController.sendError(this.res, 422,"Η καρτέλα υλικού δεν μπορεί να είναι κενή");
            } else {
                await ImportsExportsTbl.insertToDB(importsexportstbl);
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
            if (importsexportstbl.Date === undefined || importsexportstbl.Date === null || importsexportstbl.Date.toString() === "") {
                ErrorController.sendError(this.res, 422,"Η ημερομηνία δεν μπορεί να είναι κενή");
            } else if (importsexportstbl.Imported === undefined || importsexportstbl.Imported === null) {
                ErrorController.sendError(this.res, 422,"Οι εισαγωγές δεν μπορεί να είναι κενές");
            } else if (!Number.isInteger(Number(importsexportstbl.Imported))) {
                ErrorController.sendError(this.res, 422,"Οι εισαγωγές πρέπει να είναι ακέραιος αριθμός");
            } else if (importsexportstbl.Imported < 0) {
                ErrorController.sendError(this.res, 422,"Οι εισαγωγές πρέπει να είναι θετικός αριθμός");
            } else if (importsexportstbl.Exported === undefined || importsexportstbl.Exported === null) {
                ErrorController.sendError(this.res, 422,"Οι εξαγωγές δεν μπορεί να είναι κενές");
            } else if (!Number.isInteger(Number(importsexportstbl.Exported))) {
                ErrorController.sendError(this.res, 422,"Οι εξαγωγές πρέπει να είναι ακέραιος αριθμός");
            } else if (importsexportstbl.Exported < 0) {
                ErrorController.sendError(this.res, 422,"Οι εξαγωγές πρέπει να είναι θετικός αριθμός");
            } else if (importsexportstbl.Remaining === undefined || importsexportstbl.Remaining === null) {
                ErrorController.sendError(this.res, 422,"Το υπόλοιπο δεν μπορεί να είναι κενές");
            } else if (!Number.isInteger(Number(importsexportstbl.Remaining))) {
                ErrorController.sendError(this.res, 422,"Το υπόλοιπο πρέπει να είναι ακέραιος αριθμός");
            } else if (importsexportstbl.Remaining < 0) {
                ErrorController.sendError(this.res, 422,"Το υπόλοιπο πρέπει να είναι θετικός αριθμός");
            } else if (importsexportstbl.MaterialTab === undefined || importsexportstbl.MaterialTab === null) {
                ErrorController.sendError(this.res, 422,"Η καρτέλα υλικού δεν μπορεί να είναι κενή");
            } else {
                await ImportsExportsTbl.updateInDB(importsexportstbl);
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