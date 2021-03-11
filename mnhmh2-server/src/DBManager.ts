const mssql = require("mssql");

const config = {
    user: "retsi17",
    password: "1821",
    server: "DESKTOP-RO1RABI\\SQLEXPRESS",
    database: "MNHMH"
};

export class DBManager {
    pool: any = null;
    error: any = null;

    async init(): Promise<void> {
        try {
            this.pool = await mssql.connect(config);
            console.log("DBManager: Successfully connected to DB!");
        } catch(err) {
            this.pool = null;
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