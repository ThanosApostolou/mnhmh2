import { Request, Response } from "express";

import { ImportsExportsTbl } from "../entities/ImportsExportsTbl";

export class ImportsExportsTblController {
    req: Request = null;
    res: Response = null;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const ietbls = await ImportsExportsTbl.listSelectFromDB(null);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(ImportsExportsTbl.listToJson(ietbls));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}