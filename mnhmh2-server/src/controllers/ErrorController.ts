import { Response } from "express";

export class ErrorController {
    
    static sendError(res: Response, status: number, error: any): void {                    
        res.status(status);
        res.setHeader("Content-Type", "application/json");
        res.send({error: error});
    }

}