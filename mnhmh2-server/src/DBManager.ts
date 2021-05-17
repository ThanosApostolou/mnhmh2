const mssql = require("mssql");
import {createConnection, Connection, Repository } from "typeorm";
import { AmmunitionPortion } from "./entities/AmmunitionPortion";
import { AmmunitionStore } from "./entities/AmmunitionStore";
import { Borrower } from "./entities/Borrower";
import { Category } from "./entities/Category";
import { DirectMaterialBorrower } from "./entities/DirectMaterialBorrower";
import { Group } from "./entities/Group";
import { ImportsExportsTbl } from "./entities/ImportsExportsTbl";

import {Manager} from "./entities/Manager";
import { MaterialTab } from "./entities/MaterialTab";
import { Subcategory } from "./entities/Subcategory";

const config = {
    user: "retsi17",
    password: "1821",
    server: "DESKTOP-RO1RABI\\SQLEXPRESS",
    database: "MNHMH",
    connectionTimeout: 30000,
    requestTimeout: 40000
};

export class DBManager {
    connection: Connection = null;
    materialTabRepo: Repository<MaterialTab> = null;
    directMaterialBorrowerRepo: Repository<DirectMaterialBorrower> = null;
    importsexportstblRepo: Repository<ImportsExportsTbl> = null;
    subcategoryRepo: Repository<Subcategory> = null;
    categoryRepo: Repository<Category> = null;
    ammunitionPortionRepo: Repository<AmmunitionPortion> = null;
    ammunitionStoreRepo: Repository<AmmunitionStore> = null;
    borrowerRepo: Repository<Borrower> = null;
    groupRepo: Repository<Group> = null;
    managerRepo: Repository<Manager> = null;

    pool: any = null;
    error: any = null;

    async init(username: string, password: string, host: string, database: string): Promise<void> {
        try {
            this.connection = await createConnection({
                type: "mssql",
                host: host,
                username: username,
                password: password,
                database: database,
                synchronize: false,
                logging: false,
                entities: [
                    MaterialTab,
                    DirectMaterialBorrower,
                    ImportsExportsTbl,
                    Category,
                    Subcategory,
                    AmmunitionPortion,
                    AmmunitionStore,
                    Manager,
                    Borrower,
                    Group,
                ]
            });
            //this.pool = await mssql.connect(config);
            console.log("DBManager: Successfully connected to DB!");
            this.materialTabRepo = this.connection.getRepository(MaterialTab);
            this.directMaterialBorrowerRepo = this.connection.getRepository(DirectMaterialBorrower);
            this.importsexportstblRepo = this.connection.getRepository(ImportsExportsTbl);
            this.subcategoryRepo = this.connection.getRepository(Subcategory);
            this.categoryRepo = this.connection.getRepository(Category);
            this.ammunitionPortionRepo = this.connection.getRepository(AmmunitionPortion);
            this.ammunitionStoreRepo = this.connection.getRepository(AmmunitionStore);
            this.borrowerRepo = this.connection.getRepository(Borrower);
            this.groupRepo = this.connection.getRepository(Group);
            this.managerRepo = this.connection.getRepository(Manager);
        } catch(err) {
            this.pool = null;
            this.connection = null;
            this.error = err;
            console.log("DBManager: ", err);
        }
    }

    async execute(query: string): Promise<any> {
        if (this.pool === null) {
            return this.error;
        }
        return (await this.pool.query(query));
    }

    static columnsStringFromList(fieldsList: string[], prefix: string): string {
        let columns = "";
        for (const [index, item] of fieldsList.entries()) {
            columns += ` ${item} as [${prefix}${item}] `;
            if (index + 1 < fieldsList.length) {
                columns += ",";
            }
        }
        return columns;
    }
}