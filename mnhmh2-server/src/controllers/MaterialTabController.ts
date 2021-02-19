import { Request, Response } from "express";

import { App } from "../App";

export class MaterialTabController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const result = await App.app.dbmanager.execute("SELECT * FROM MaterialTabs");
            this.res.send(JSON.stringify(result));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}