import { Request, Response } from "express";

import { App } from "../App";
import { Subcategory } from "../entities/Subcategory";
import { ErrorController } from "./ErrorController";

export class SubcategoryController {
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
            const subcategories = await Subcategory.listSelectFromDB(Id, notId, search, withMaterialTab, withBorrower, materialTabId, notMaterialTabId, borrowerId, notBorrowerId);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Subcategory.listToJson(subcategories));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const subcategory = Subcategory.fromObject(body.subcategory);
            if (!subcategory.Name || subcategory.Name === null || subcategory.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else if (subcategory.MaterialTab === undefined || subcategory.MaterialTab === null) {
                ErrorController.sendError(this.res, 422,"Η καρτέλα υλικού δεν μπορεί να είναι κενή");
            } else if (subcategory.Borrower === undefined || subcategory.Borrower === null) {
                ErrorController.sendError(this.res, 422,"Ο μερικός διαχειριστής δεν μπορεί να είναι κενός");
            } else {
                await Subcategory.insertToDB(subcategory);
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
            await Subcategory.deleteInDB(Id);
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
            const subcategory = Subcategory.fromObject(body.subcategory);
            if (!subcategory.Name || subcategory.Name === null || subcategory.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else if (subcategory.MaterialTab === undefined || subcategory.MaterialTab === null) {
                ErrorController.sendError(this.res, 422,"Η καρτέλα υλικού δεν μπορεί να είναι κενή");
            } else if (subcategory.Borrower === undefined || subcategory.Borrower === null) {
                ErrorController.sendError(this.res, 422,"Ο μερικός διαχειριστής δεν μπορεί να είναι κενός");
            } else {
                await Subcategory.updateInDB(subcategory);
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