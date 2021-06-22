import { Request, Response } from "express";

import { App } from "../App";
import { AmmunitionPortion } from "../entities/AmmunitionPortion";
import { ErrorController } from "./ErrorController";

export class AmmunitionPortionController {
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
            let withAmmunitionStore = true;
            if (this.req.query["withAmmunitionStore"]) {
                withAmmunitionStore = (this.req.query["withAmmunitionStore"].toString().trim() === "true");
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
            let ammunitionStoreId = null;
            if (this.req.query["ammunitionStoreId"]) {
                ammunitionStoreId = parseInt(this.req.query["ammunitionStoreId"].toString().trim());
            }
            let notAmmunitionStoreId = null;
            if (this.req.query["notAmmunitionStoreId"]) {
                notAmmunitionStoreId = parseInt(this.req.query["notAmmunitionStoreId"].toString().trim());
            }
            let materialTabId = null;
            if (this.req.query["materialTabId"]) {
                materialTabId = parseInt(this.req.query["materialTabId"].toString().trim());
            }
            let notMaterialTabId = null;
            if (this.req.query["notMaterialTabId"]) {
                notMaterialTabId = parseInt(this.req.query["notMaterialTabId"].toString().trim());
            }
            const portions = await AmmunitionPortion.listSelectFromDB(Id, notId, search, withAmmunitionStore, withMaterialTab, ammunitionStoreId, notAmmunitionStoreId, materialTabId, notMaterialTabId);
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
            const portion = AmmunitionPortion.fromObject(body.portion);
            if (!portion.Name || portion.Name === null || portion.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else if (portion.Quantity === undefined || portion.Quantity === null) {
                ErrorController.sendError(this.res, 422,"Η ποστότητα δεν μπορεί να είναι κενή");
            } else if (!Number.isInteger(Number(portion.Quantity))) {
                ErrorController.sendError(this.res, 422,"Η ποστότητα πρέπει να είναι ακέραιος αριθμός");
            } else if (portion.Quantity < 0) {
                ErrorController.sendError(this.res, 422,"Η ποστότητα πρέπει να είναι θετικός αριθμός");
            } else if (portion.MaterialTab === undefined || portion.MaterialTab === null) {
                ErrorController.sendError(this.res, 422,"Η καρτέλα υλικού δεν μπορεί να είναι κενή");
            } else if (portion.AmmunitionStore === undefined || portion.AmmunitionStore === null) {
                ErrorController.sendError(this.res, 422,"Η αποθήκη δεν μπορεί να είναι κενή");
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
            const portion = AmmunitionPortion.fromObject(body.portion);
            if (!portion.Name || portion.Name === null || portion.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else if (portion.Quantity === undefined || portion.Quantity === null) {
                ErrorController.sendError(this.res, 422,"Η ποστότητα δεν μπορεί να είναι κενή");
            } else if (!Number.isInteger(Number(portion.Quantity))) {
                ErrorController.sendError(this.res, 422,"Η ποστότητα πρέπει να είναι ακέραιος αριθμός");
            } else if (portion.Quantity < 0) {
                ErrorController.sendError(this.res, 422,"Η ποστότητα πρέπει να είναι θετικός αριθμός");
            } else if (portion.MaterialTab === undefined || portion.MaterialTab === null) {
                ErrorController.sendError(this.res, 422,"Η καρτέλα υλικού δεν μπορεί να είναι κενή");
            } else if (portion.AmmunitionStore === undefined || portion.AmmunitionStore === null) {
                ErrorController.sendError(this.res, 422,"Η αποθήκη δεν μπορεί να είναι κενή");
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