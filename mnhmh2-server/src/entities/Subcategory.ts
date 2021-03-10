import { App } from "../App";
import { Borrower } from "./Borrower";
import { MaterialTab } from "./MaterialTab";

export class Subcategory {
    Id: number;
    VersionTimestamp: string;
    Name: string;
    MaterialTab: MaterialTab;
    Borrower: Borrower;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(subcategory: Subcategory[]): string {
        return JSON.stringify(subcategory);
    }

    static fromObject(obj: any): Subcategory {
        const subcategory = new Subcategory();
        subcategory.Id = obj.Id;
        subcategory.VersionTimestamp = obj.VersionTimestamp;
        subcategory.Name = obj.Name;
        subcategory.MaterialTab = obj.MaterialTab;
        subcategory.Borrower = obj.Borrower;
        return subcategory;
    }

    static listFromObjectList(objlist: any[]): Subcategory[] {
        const subcategories: Subcategory[] = [];
        for (const obj of objlist) {
            subcategories.push(Subcategory.fromObject(obj));
        }
        return subcategories;
    }

    static async listSelectFromDB(whereclause: string): Promise<Subcategory[]> {
        const query: string = whereclause === null ? "SELECT * FROM Subcategories" : "SELECT * FROM Subcategories WHERE " + whereclause;
        let subcategories: Subcategory[] = [];
        try {
            const result = await App.app.dbmanager.execute(query);
            for (const record of result.recordset) {
                record.MaterialTab = await MaterialTab.listSelectFromDB("Id = " + record.MaterialTab);
                if (record.MaterialTab.length > 0) {
                    record.MaterialTab = record.MaterialTab[0];
                }
                record.Borrower = await Borrower.listSelectFromDB("Id = " + record.Borrower);
                if (record.Borrower.length > 0) {
                    record.Borrower = record.Borrower[0];
                }
            }
            subcategories = Subcategory.listFromObjectList(result.recordset);
            return subcategories;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}