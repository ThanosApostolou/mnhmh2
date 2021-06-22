import { Request, Response } from "express";

import { App } from "../App";
import { Group } from "../entities/Group";
import { ErrorController } from "./ErrorController";

export class GroupController {
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
            const groups = await Group.listSelectFromDB(Id, notId, search);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Group.listToJson(groups));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }

    async POST(): Promise<void> {
        try {
            const body = this.req.body;
            const group = Group.fromObject(body.group);
            if (!group.Name || group.Name === null || group.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else {
                await Group.insertToDB(group);
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
            await Group.deleteInDB(Id);
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
            const group = Group.fromObject(body.group);
            if (!group.Name || group.Name === null || group.Name === "") {
                ErrorController.sendError(this.res, 422,"Το όνομα δεν μπορεί να είναι κενό");
            } else {
                await Group.updateInDB(group);
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