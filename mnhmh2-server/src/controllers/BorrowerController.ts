import { Request, Response } from "express";

import { App } from "../App";
import { Borrower } from "../entities/Borrower";

export class BorrowerController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const borrowers = await Borrower.listSelectFromDB(null);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(Borrower.listToJson(borrowers));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}