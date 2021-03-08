import { Request, Response } from "express";

import { App } from "../App";
import { Subcategory } from "../entities/Subcategory";

export class SubcategoryController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const subcategories = await Subcategory.listSelectFromDB(null);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Subcategory.listToJson(subcategories));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}