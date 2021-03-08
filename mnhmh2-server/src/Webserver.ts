const express = require("express");
import { Request, Response } from "express";
import path from "path";

import { App } from "./App";
import { RootController } from "./controllers/RootController";
import { MaterialTabController } from "./controllers/MaterialTabController";
import { DistributionChargeController } from "./controllers/DistributionChargeController";
import { GroupController } from "./controllers/GroupController";
import { ManagerController } from "./controllers/ManagerController";
import { BorrowerController } from "./controllers/BorrowerController";
import { AmmunitionStoreController } from "./controllers/AmmunitionStoreController";

export class Webserver {
    expressapp: any = null;

    init(): void {
        this.expressapp = express();
        const { PORT = 3000 } = process.env;
        this.expressapp.use(express.static(__dirname + "/public"));

        this.expressapp.get("/api", (req: Request, res: Response) => {
            new RootController(req, res).GET();
        });

        this.expressapp.get("/api/materialtab", (req: Request, res: Response) => {
            new MaterialTabController(req, res).GET();
        });

        this.expressapp.get("/api/distributioncharge", (req: Request, res: Response) => {
            new DistributionChargeController(req, res).GET();
        });

        this.expressapp.get("/api/ammunitionstore", (req: Request, res: Response) => {
            new AmmunitionStoreController(req, res).GET();
        });

        this.expressapp.get("/api/borrower", (req: Request, res: Response) => {
            new BorrowerController(req, res).GET();
        });

        this.expressapp.get("/api/group", (req: Request, res: Response) => {
            new GroupController(req, res).GET();
        });

        this.expressapp.get("/api/manager", (req: Request, res: Response) => {
            new ManagerController(req, res).GET();
        });

        this.expressapp.use(redirectUnmatched);
        this.expressapp.listen(PORT, () => {
            console.log("server started at http://localhost:"+PORT);
        });

        
    }
}

function redirectUnmatched(req: Request, res: Response) {
    res.sendFile(path.join(__dirname+"/public/index.html/"));
}  