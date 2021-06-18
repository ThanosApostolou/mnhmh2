import { Request, Response } from "express";

import { App } from "../App";
import { MaterialTab } from "../entities/MaterialTab";
import { ErrorController } from "./ErrorController";

export class MaterialTabController {
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
            let withGroup = true;
            if (this.req.query["withGroup"]) {
                withGroup = (this.req.query["withGroup"].toString().trim() === "true");
            }
            let withCategory = true;
            if (this.req.query["withCategory"]) {
                withCategory = (this.req.query["withCategory"].toString().trim() === "true");
            }
            let groupId = null;
            if (this.req.query["groupId"]) {
                groupId = parseInt(this.req.query["groupId"].toString().trim());
            }
            let notGroupId = null;
            if (this.req.query["notGroupId"]) {
                notGroupId = parseInt(this.req.query["notGroupId"].toString().trim());
            }
            let categoryId = null;
            if (this.req.query["categoryId"]) {
                categoryId = parseInt(this.req.query["categoryId"].toString().trim());
            }
            let notCategoryId = null;
            if (this.req.query["notCategoryId"]) {
                notCategoryId = parseInt(this.req.query["notCategoryId"].toString().trim());
            }
            const mtbs = await MaterialTab.listSelectFromDB(Id, notId, search, withGroup, withCategory, groupId, notGroupId, categoryId, notCategoryId);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(MaterialTab.listToJson(mtbs));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const mtb = MaterialTab.fromObject(body.materialTab);
            if (!mtb.Name || mtb.Name === null || mtb.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else if (mtb.Group === undefined || mtb.Group === null) {
                ErrorController.sendError(this.res, 422,"Η ομάδα δεν μπορεί να είναι κενή");
            }  else if (mtb.Category === undefined || mtb.Category === null) {
                ErrorController.sendError(this.res, 422, "Το συκγρότημα δεν μπορεί να είναι κενό");
            } else {
                await MaterialTab.insertToDB(mtb);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({message: "OK"});
            }
        } catch(err) {
            console.log(err);
            ErrorController.sendError(this.res, 500, err);
        }
    }
    async DELETE(): Promise<void> {
        try {
            const body = this.req.body;
            const Id: number = body.Id;
            await MaterialTab.deleteInDB(Id);
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
            const mtb = MaterialTab.fromObject(body.materialTab);
            if (!mtb.Name || mtb.Name === null || mtb.Name === "") {
                this.res.status(422);
                this.res.setHeader("Content-Type", "application/json");
                this.res.send({error: "Name cannot be empty!"});
            } else {
                await MaterialTab.updateInDB(mtb);
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