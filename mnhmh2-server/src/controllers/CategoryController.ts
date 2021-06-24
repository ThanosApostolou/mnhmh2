import { Request, Response } from "express";

import { Category } from "../entities/Category";
import { ErrorController } from "./ErrorController";

export class CategoryController {
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
            let search = "";
            if (this.req.query["search"]) {
                search = this.req.query["search"].toString().trim();
            }
            const categories = await Category.listSelectFromDB(Id, notId, search);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Category.listToJson(categories));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const category = Category.fromObject(body.category);
            if (!category.Name || category.Name === null || category.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else {
                await Category.insertToDB(category);
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
            await Category.deleteInDB(Id);
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
            const category = Category.fromObject(body.category);
            if (!category.Name || category.Name === null || category.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else {
                await Category.updateInDB(category);
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