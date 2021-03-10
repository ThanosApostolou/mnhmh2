import { App } from "../App";
import { Manager, ManagerDBObj, ManagerObj } from "./Manager";

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

    static fromDBObject(dbobj: BorrowerDBObj): Borrower {
        const borrower = new Borrower();
        borrower.Id = dbobj["Borrowers.Id"];
        borrower.Name = dbobj["Borrowers.Name"];
        borrower.SerialNumber = dbobj["Borrowers.SerialNumber"];
        borrower.Manager = Manager.fromDBObject(dbobj);
        return borrower;
    }

    static listFromDBObjectList(objlist: BorrowerDBObj[]): Borrower[] {
        const borrowers: Borrower[] = [];
        for (const dbobj of objlist) {
            borrowers.push(Borrower.fromDBObject(dbobj));
        }
        return borrowers;
    }

    private static _selectColumns(): string {
        const columns ="Borrowers.Id as [Borrowers.Id], Borrowers.Name as [Borrowers.Name], Borrowers.SerialNumber as [Borrowers.SerialNumber]";
        return columns;
    }

    static selectQuery(whereclause: string): string {
        let query = " \
            (SELECT " + Borrower._selectColumns() + ", Managers.* \
            FROM Borrowers \
            LEFT JOIN " + Manager.selectQuery(null) + " as Managers \
            ON Borrowers.Manager = Managers.[Managers.Id] \
        ";
        if (whereclause != null) {
            query += " WHERE " + whereclause;
        }
        query += ")";
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<Borrower[]> {
        let borrowers: Borrower[] = [];
        try {
            const result = await App.app.dbmanager.execute(Borrower.selectQuery(whereclause));
            borrowers = Borrower.listFromDBObjectList(result.recordset);
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
    "Borrowers.Id": number;
    "Borrowers.Name": string;
    "Borrowers.SerialNumber": number;
    "Managers.Id": number;
    "Managers.Name": string;
    "Managers.Rank": string;
    "Managers.Position": string;
}