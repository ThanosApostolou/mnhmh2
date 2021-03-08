import { App } from "../App";

export class Borrower {
    Id: number;
    VersionTimestamp: string;
    Name: string;
    SerialNumber: number;
    Manager: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(manager: Borrower[]) {
        return JSON.stringify(manager);
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
            borrowers = Borrower.listFromObjectList(result.recordset);
            return borrowers;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}