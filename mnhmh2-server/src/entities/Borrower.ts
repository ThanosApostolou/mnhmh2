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
        borrower.Manager = obj.Manager;
        return borrower;
    }

    static listFromObjectList(objlist: any[]): Borrower[] {
        const borrowers: Borrower[] = [];
        for (const obj of objlist) {
            borrowers.push(Borrower.fromObject(obj));
        }
        return borrowers;
    }

    static async listSelectFromDB(): Promise<Borrower[]> {
        let borrowers: Borrower[] = [];
        try {
            const result = await App.app.dbmanager.execute("SELECT * FROM Borrowers");
            for (const obj of result.recordset) {
                obj.Manager = await Manager.listSelectFromDB("Id = " + obj.Manager);
                if (obj.Manager.length > 0) {
                    obj.Manager = obj.Manager[0];
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