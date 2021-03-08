import { Request, Response } from "express";

import { App } from "../App";
import { Category } from "../entities/Category";

export class CategoryController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const categories = await Category.listSelectFromDB(null);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Category.listToJson(categories));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}