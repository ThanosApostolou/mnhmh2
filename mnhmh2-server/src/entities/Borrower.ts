import { App } from "../App";
import { Manager } from "./Manager";

export class Borrower {
    Id: number;
    VersionTimestamp: string;
    Name: string;
    SerialNumber: number;
    Manager: Manager;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(borrower: Borrower[]) {
        return JSON.stringify(borrower);
    }

    static fromObject(obj: any): Borrower {
        const borrower = new Borrower();
        borrower.Id = obj.Id;
        borrower.VersionTimestamp = obj.VersionTimestamp;
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

    static async listSelectFromDB(whereclause: string): Promise<Borrower[]> {
        const query: string = whereclause === null ? "SELECT * FROM Borrowers" : "SELECT * FROM Borrowers WHERE " + whereclause;
        let borrowers: Borrower[] = [];
        try {
            const result = await App.app.dbmanager.execute(query);
            for (const record of result.recordset) {
                record.Manager = await Manager.listSelectFromDB("Id = " + record.Manager);
                if (record.Manager.length > 0) {
                    record.Manager = record.Manager[0];
                }
            }
            borrowers = Borrower.listFromObjectList(result.recordset);
            return borrowers;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}