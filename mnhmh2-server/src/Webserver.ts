const express = require("express");
import { Request, Response } from "express";
import path from "path";

import { RootController } from "./controllers/RootController";
import { MaterialTabController } from "./controllers/MaterialTabController";
import { GroupController } from "./controllers/GroupController";
import { ManagerController } from "./controllers/ManagerController";
import { BorrowerController } from "./controllers/BorrowerController";
import { AmmunitionStoreController } from "./controllers/AmmunitionStoreController";
import { AmmunitionPortionController } from "./controllers/AmmunitionPortionController";
import { CategoryController } from "./controllers/CategoryController";
import { SubcategoryController } from "./controllers/SubcategoryController";
import { DirectMaterialBorrowerController } from "./controllers/DirectMaterialBorrowerController";
import { ImportsExportsTblController } from "./controllers/ImportsExportsTblController";
import { NotFoundController } from "./controllers/NotFoundController";

export class Webserver {
    expressapp: any = null;

    init(): void {
        this.expressapp = express();
        const { PORT = 3000 } = process.env;
        this.expressapp.use(express.json());
        this.expressapp.use(express.static(__dirname + "/public"));

        this.expressapp.get("/api", (req: Request, res: Response) => {
            new RootController(req, res).GET();
        });

        this.expressapp.get("/api/materialtab", (req: Request, res: Response) => {
            new MaterialTabController(req, res).GET();
        });

        this.expressapp.get("/api/directmaterialborrower", (req: Request, res: Response) => {
            new DirectMaterialBorrowerController(req, res).GET();
        });

        this.expressapp.get("/api/importsexportstbl", (req: Request, res: Response) => {
            new ImportsExportsTblController(req, res).GET();
        });

        this.expressapp.get("/api/category", (req: Request, res: Response) => {
            new CategoryController(req, res).GET();
        });

        this.expressapp.get("/api/subcategory", (req: Request, res: Response) => {
            new SubcategoryController(req, res).GET();
        });

        this.expressapp.get("/api/ammunitionportion", (req: Request, res: Response) => {
            new AmmunitionPortionController(req, res).GET();
        });

        this.expressapp.get("/api/ammunitionstore", (req: Request, res: Response) => {
            new AmmunitionStoreController(req, res).GET();
        });
        this.expressapp.post("/api/ammunitionstore", (req: Request, res: Response) => {
            new AmmunitionStoreController(req, res).POST();
        });
        this.expressapp.delete("/api/ammunitionstore", (req: Request, res: Response) => {
            new AmmunitionStoreController(req, res).DELETE();
        });
        this.expressapp.put("/api/ammunitionstore", (req: Request, res: Response) => {
            new AmmunitionStoreController(req, res).PUT();
        });

        this.expressapp.get("/api/borrower", (req: Request, res: Response) => {
            new BorrowerController(req, res).GET();
        });
        this.expressapp.post("/api/borrower", (req: Request, res: Response) => {
            new BorrowerController(req, res).POST();
        });
        this.expressapp.delete("/api/borrower", (req: Request, res: Response) => {
            new BorrowerController(req, res).DELETE();
        });
        this.expressapp.put("/api/borrower", (req: Request, res: Response) => {
            new BorrowerController(req, res).PUT();
        });

        this.expressapp.get("/api/group", (req: Request, res: Response) => {
            new GroupController(req, res).GET();
        });
        this.expressapp.post("/api/group", (req: Request, res: Response) => {
            new GroupController(req, res).POST();
        });
        this.expressapp.delete("/api/group", (req: Request, res: Response) => {
            new GroupController(req, res).DELETE();
        });
        this.expressapp.put("/api/group", (req: Request, res: Response) => {
            new GroupController(req, res).PUT();
        });

        this.expressapp.get("/api/manager", (req: Request, res: Response) => {
            new ManagerController(req, res).GET();
        });
        this.expressapp.post("/api/manager", (req: Request, res: Response) => {
            new ManagerController(req, res).POST();
        });
        this.expressapp.delete("/api/manager", (req: Request, res: Response) => {
            new ManagerController(req, res).DELETE();
        });
        this.expressapp.put("/api/manager", (req: Request, res: Response) => {
            new ManagerController(req, res).PUT();
        });

        this.expressapp.all("/api/*", (req: Request, res: Response) => {
            new NotFoundController(req, res).GET();
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