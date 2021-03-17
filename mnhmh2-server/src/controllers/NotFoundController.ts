import { Request, Response } from "express";

export class NotFoundController {
    req: Request = null;
    res: Response = null;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            this.res.status(404);
            this.res.setHeader("Content-Type", "application/json");
            this.res.send({
                error: this.req.method + " method at " + this.req.path + " path not found!"
            });
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}