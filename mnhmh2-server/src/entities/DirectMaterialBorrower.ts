import { App } from "../App";
import { Borrower } from "./Borrower";
import { MaterialTab } from "./MaterialTab";

export class DirectMaterialBorrower {
    Id: number;
    VersionTimestamp: string;
    Quantity: number;
    Borrower: Borrower;
    MaterialTab: MaterialTab;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(dmb: DirectMaterialBorrower[]) {
        return JSON.stringify(dmb);
    }

    static fromObject(obj: any): DirectMaterialBorrower {
        const dmb: DirectMaterialBorrower = new DirectMaterialBorrower();
        dmb.Id = obj.Id;
        dmb.VersionTimestamp = obj.VersionTimestamp;
        dmb.Quantity = obj.Quantity;
        dmb.Borrower = Borrower.fromObject(obj.Borrower);
        dmb.MaterialTab = MaterialTab.fromObject(obj.MaterialTab);
        return dmb;
    }

    static listFromObjectList(objlist: any[]): DirectMaterialBorrower[] {
        const dmbs: DirectMaterialBorrower[] = [];
        for (const obj of objlist) {
            dmbs.push(DirectMaterialBorrower.fromObject(obj));
        }
        return dmbs;
    }

    static async listSelectFromDB(whereclause: string): Promise<DirectMaterialBorrower[]> {
        const query: string = whereclause === null ? "SELECT * FROM DirectMaterialBorrowers" : "SELECT * FROM DirectMaterialBorrowers WHERE " + whereclause;
        let dmbs: DirectMaterialBorrower[] = [];
        try {
            const result = await App.app.dbmanager.execute(query);
            const promises: Promise<any>[] = [];
            for (const record of result.recordset) {
                record.Borrower = await Borrower.listSelectFromDB("Id = " + record.Borrower);

                if (record.Borrower.length > 0) {
                    record.Borrower = record.Borrower[0];
                }
                record.MaterialTab = await MaterialTab.listSelectFromDB("Id = " + record.MaterialTab);
                if (record.MaterialTab.length > 0) {
                    record.MaterialTab = record.MaterialTab[0];
                }
            }
            dmbs = DirectMaterialBorrower.listFromObjectList(result.recordset);
            return dmbs;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}