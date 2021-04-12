import { App } from "../App";
import { DBManager } from "../DBManager";
import { Manager, ManagerObj } from "./Manager";

export class Borrower {
    Id: number;
    Name: string;
    SerialNumber: number;
    Manager: Manager;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(borrower: Borrower[]): string {
        return JSON.stringify(borrower);
    }

    static fromObject(obj: BorrowerObj): Borrower {
        const borrower = new Borrower();
        borrower.Id = obj.Id;
        borrower.Name = obj.Name;
        borrower.SerialNumber = obj.SerialNumber;
        borrower.Manager = Manager.fromObject(obj.Manager);
        return borrower;
    }

    static listFromObjectList(objlist: any[]): Borrower[] {
        const borrowers: Borrower[] = [];
        for (const obj of objlist) {
            borrowers.push(Borrower.fromObject(obj));
        }
        return borrowers;
    }

    static fromDBObject(dbobj: any, prefix: string): Borrower {
        const borrower = new Borrower();
        borrower.Id = dbobj[`${prefix}Id`];
        borrower.Name = dbobj[`${prefix}Name`];
        borrower.SerialNumber = dbobj[`${prefix}SerialNumber`];
        borrower.Manager = Manager.fromDBObject(dbobj, `${prefix}Managers.`);
        return borrower;
    }

    static listFromDBObjectList(objlist: any[], prefix: string): Borrower[] {
        const borrowers: Borrower[] = [];
        for (const dbobj of objlist) {
            borrowers.push(Borrower.fromDBObject(dbobj, prefix));
        }
        return borrowers;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "SerialNumber"];
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(Borrower._getOwnFieldsList(), prefix)}, Managers.*
            FROM Borrowers
            LEFT JOIN ${Manager.selectQuery(null, `${prefix}Managers.`)} as Managers
            ON Borrowers.Manager = Managers.[${prefix}Managers.Id]
            ${wherestring})
        `;
        return query;
    }

    static searchWhereclause(search: string, prefix: string): string {
        let whereclause = null;
        if (search !== "") {
            whereclause = `${prefix}Id LIKE '%${search}%' OR ${prefix}Name LIKE '%${search}%' OR ${prefix}SerialNumber LIKE '%${search}%' OR '${prefix}Managers.Name' LIKE '%${search}%'`;
        }
        return whereclause;
    }
    static insertQuery(borrower: Borrower): string {
        const query = `
            INSERT INTO Borrowers (Id, Name, SerialNumber, Manager)
            VALUES ('${borrower.Id}', '${borrower.Name}', '${borrower.SerialNumber}', '${borrower.Manager.Id}')
        `;
        return query;
    }
    static deleteQuery(Id: number): string {
        const query = `
            DELETE FROM Borrowers
            WHERE Id='${Id}'
        `;
        return query;
    }
    static updateQuery(borrower: Borrower): string {
        const query = `
            UPDATE Borrowers
            SET Name='${borrower.Name}', SerialNumber='${borrower.SerialNumber}', Manager='${borrower.Manager.Id}'
            WHERE Id='${borrower.Id}'
        `;
        return query;
    }

    static async listSelectFromDB(search: string): Promise<Borrower[]> {
        let borrowers: Borrower[] = [];
        try {
            const whereclause = Borrower.searchWhereclause(search, "");
            const selectquery = Borrower.selectQuery(whereclause, "");
            const result = await App.app.dbmanager.execute(selectquery);
            const recordset: BorrowerDBObj[] = result.recordset;
            borrowers = Borrower.listFromDBObjectList(recordset, "");
            return borrowers;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(borrower: Borrower): Promise<Borrower> {
        try {
            const result1 = await App.app.dbmanager.execute("SELECT MAX(Id) FROM Borrowers");
            let maxId = 0;
            if (result1.recordset.length > 0) {
                maxId = result1.recordset[0][""];
            }
            borrower.Id = 1 + maxId;
            const result = await App.app.dbmanager.execute(Borrower.insertQuery(borrower));
            return borrower;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            const result = await App.app.dbmanager.execute(Borrower.deleteQuery(Id));
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(borrower: Borrower): Promise<Borrower> {
        try {
            const result = await App.app.dbmanager.execute(Borrower.updateQuery(borrower));
            return borrower;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export interface BorrowerObj {
    Id: number;
    Name: string;
    SerialNumber: number;
    Manager: ManagerObj;
}

export interface BorrowerDBObj {
    "Id": number;
    "Name": string;
    "SerialNumber": number;
    "Managers.Id": number;
    "Managers.Name": string;
    "Managers.Rank": string;
    "Managers.Position": string;
}