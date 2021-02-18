import { Request, Response } from "express";

import { App } from "../App";
import { RuntimeInfo } from "../RuntimeInfo";

export class RootController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    GET(): void {
        this.res.send(App.app.runtimeinfo.toJson());
    }
}