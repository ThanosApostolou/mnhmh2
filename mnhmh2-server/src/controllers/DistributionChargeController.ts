import { Request, Response } from "express";
import { DistributionCharge } from "../entities/DistributionCharge";

export class DistributionChargeController {
    req: Request = null;
    res: Response = null;
    
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async GET(): Promise<void> {
        try {
            const distributioncharges = await DistributionCharge.listSelectFromDB();
            this.res.setHeader("Content-Type", "application/json");
            this.res.send(DistributionCharge.listToJson(distributioncharges));
        } catch(err) {
            console.log(err);
            this.res.status(500);
            this.res.send(err);
        }
    }
}