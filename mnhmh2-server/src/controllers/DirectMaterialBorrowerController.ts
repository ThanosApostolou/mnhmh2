import { Request, Response } from "express";

import { App } from "../App";
import { DirectMaterialBorrower } from "../entities/DirectMaterialBorrower";

export class DirectMaterialBorrowerController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const subcategories = await DirectMaterialBorrower.listSelectFromDB(null);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(DirectMaterialBorrower.listToJson(subcategories));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}