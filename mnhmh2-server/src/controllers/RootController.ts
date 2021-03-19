import { Request, Response } from "express";

import { App } from "../App";

export class RootController {
    req: Request = null;
    res: Response = null;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    GET(): void {
        this.res.setHeader("Content-Type", "application/json");
        this.res.send(App.app.runtimeinfo.toJson());
    }
}