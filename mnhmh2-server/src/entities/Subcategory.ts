import { App } from "../App";
import { DBManager } from "../DBManager";
import { Borrower } from "./Borrower";
import { MaterialTab } from "./MaterialTab";

export class Subcategory {
    Id: number;
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

    static fromDBObject(obj: any, prefix: string): Subcategory {
        const subcategory = new Subcategory();
        subcategory.Id = obj[`${prefix}Id`];
        subcategory.Name = obj[`${prefix}Name`];
        subcategory.MaterialTab = MaterialTab.fromDBObject(obj, `${prefix}MaterialTabs.`);
        subcategory.Borrower = Borrower.fromDBObject(obj, `${prefix}Borrowers.`);
        return subcategory;
    }

    static listFromDBObjectList(objlist: any[], prefix: string): Subcategory[] {
        const subcategories: Subcategory[] = [];
        for (const obj of objlist) {
            subcategories.push(Subcategory.fromDBObject(obj, prefix));
        }
        return subcategories;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name"];
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(Subcategory._getOwnFieldsList(), prefix)}, MaterialTabs.*, Borrowers.*
            FROM Subcategories
            LEFT JOIN ${MaterialTab.selectQuery(null, `${prefix}MaterialTabs.`)} as MaterialTabs
            ON Subcategories.[MaterialTab] = MaterialTabs.[${prefix}MaterialTabs.Id]
            LEFT JOIN ${Borrower.selectQuery(null, `${prefix}Borrowers.`)} as Borrowers
            ON Subcategories.[Borrower] = Borrowers.[${prefix}Borrowers.Id]
            ${wherestring})
        `;
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<Subcategory[]> {
        /*
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
        */
        let subcategories: Subcategory[] = [];
        try {
            const result = await App.app.dbmanager.execute(Subcategory.selectQuery(whereclause, ""));
            subcategories = Subcategory.listFromDBObjectList(result.recordset, "");
            return subcategories;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}