const mssql = require("mssql");
import {createConnection, Connection, Repository } from "typeorm";
import { Borrower } from "./entities/Borrower";
import { Group } from "./entities/Group";

import {Manager} from "./entities/Manager";

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
    borrowerRepo: Repository<Borrower> = null;
    groupRepo: Repository<Group> = null;
    managerRepo: Repository<Manager> = null;

    pool: any = null;
    error: any = null;

    async init(): Promise<void> {
        try {
            this.connection = await createConnection({
                type: "mssql",
                host: "DESKTOP-RO1RABI\\SQLEXPRESS",
                username: "retsi17",
                password: "1821",
                database: "MNHMH",
                synchronize: false,
                logging: false,
                entities: [
                    Manager,
                    Borrower,
                    Group,
                ]
            });
            //this.pool = await mssql.connect(config);
            console.log("DBManager: Successfully connected to DB!");
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