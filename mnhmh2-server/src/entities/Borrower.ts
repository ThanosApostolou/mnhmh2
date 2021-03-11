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
        borrower.Manager = Manager.fromDBObject(dbobj, "Managers.");
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

    static async listSelectFromDB(whereclause: string): Promise<Borrower[]> {
        let borrowers: Borrower[] = [];
        try {
            const result = await App.app.dbmanager.execute(Borrower.selectQuery(whereclause, ""));
            const recordset: BorrowerDBObj[] = result.recordset;
            borrowers = Borrower.listFromDBObjectList(recordset, "");
            return borrowers;
        } catch(err) {
            console.log(err);
            return (err);
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