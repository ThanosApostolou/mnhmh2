import { Request, Response } from "express";

import { App } from "../App";
import { SubcategoryContent } from "../entities/SubcategoryContent";
import { ErrorController } from "./ErrorController";

export class SubcategoryContentController {
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
            let withSubcategoryBelongingTo = true;
            if (this.req.query["withSubcategoryBelongingTo"]) {
                withSubcategoryBelongingTo = (this.req.query["withSubcategoryBelongingTo"].toString().trim() === "true");
            }
            let withSubcategoryContentTab = true;
            if (this.req.query["withSubcategoryContentTab"]) {
                withSubcategoryContentTab = (this.req.query["withSubcategoryContentTab"].toString().trim() === "true");
            }
            let Id = null;
            if (this.req.query["Id"]) {
                Id = parseInt(this.req.query["Id"].toString().trim());
            }
            let notId = null;
            if (this.req.query["notId"]) {
                notId = parseInt(this.req.query["notId"].toString().trim());
            }
            let subcategoryBelongingToId = null;
            if (this.req.query["subcategoryBelongingToId"]) {
                subcategoryBelongingToId = parseInt(this.req.query["subcategoryBelongingToId"].toString().trim());
            }
            let notSubcategoryBelongingToId = null;
            if (this.req.query["notSubcategoryBelongingToId"]) {
                notSubcategoryBelongingToId = parseInt(this.req.query["notSubcategoryBelongingToId"].toString().trim());
            }
            let subcategoryContentTabId = null;
            if (this.req.query["subcategoryContentTabId"]) {
                subcategoryContentTabId = parseInt(this.req.query["subcategoryContentTabId"].toString().trim());
            }
            let notSubcategoryContentTabId = null;
            if (this.req.query["notSubcategoryContentTabId"]) {
                notSubcategoryContentTabId = parseInt(this.req.query["notSubcategoryContentTabId"].toString().trim());
            }
            const subcategoryContents = await SubcategoryContent.listSelectFromDB(Id, notId, search, withSubcategoryBelongingTo, withSubcategoryContentTab, subcategoryBelongingToId, notSubcategoryBelongingToId, subcategoryContentTabId, notSubcategoryContentTabId);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(SubcategoryContent.listToJson(subcategoryContents));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const subcategoryContent = SubcategoryContent.fromObject(body["subcategoryContent"]);
            if (subcategoryContent.Quantity === undefined || subcategoryContent.Quantity === null) {
                ErrorController.sendError(this.res, 422,"Η ποσότητα δεν μπορεί να είναι κενή");
            } else if (!Number.isInteger(Number(subcategoryContent.Quantity))) {
                ErrorController.sendError(this.res, 422,"Η ποσότητα πρέπει να είναι ακέραιος αριθμός");
            } else if (subcategoryContent.Quantity < 0) {
                ErrorController.sendError(this.res, 422,"Η ποσότητα πρέπει να είναι θετικός αριθμός");
            } else if (subcategoryContent.SubcategoryBelongingTo === undefined || subcategoryContent.SubcategoryBelongingTo === null) {
                ErrorController.sendError(this.res, 422,"Το υποσυγκρότημα δεν μπορεί να είναι κενό");
            } else if (subcategoryContent.SubcategoryContentTab === undefined || subcategoryContent.SubcategoryContentTab === null) {
                ErrorController.sendError(this.res, 422,"Η καρτέλα υλικού δεν μπορεί να είναι κενή");
            } else {
                await SubcategoryContent.insertToDB(subcategoryContent);
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
            await SubcategoryContent.deleteInDB(Id);
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
            const subcategoryContent = SubcategoryContent.fromObject(body["subcategoryContent"]);
            if (subcategoryContent.Quantity === undefined || subcategoryContent.Quantity === null) {
                ErrorController.sendError(this.res, 422,"Η ποσότητα δεν μπορεί να είναι κενή");
            } else if (!Number.isInteger(Number(subcategoryContent.Quantity))) {
                ErrorController.sendError(this.res, 422,"Η ποσότητα πρέπει να είναι ακέραιος αριθμός");
            } else if (subcategoryContent.Quantity < 0) {
                ErrorController.sendError(this.res, 422,"Η ποσότητα πρέπει να είναι θετικός αριθμός");
            } else {
                delete subcategoryContent.SubcategoryBelongingTo;
                delete subcategoryContent.SubcategoryContentTab;
                await SubcategoryContent.updateInDB(subcategoryContent);
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