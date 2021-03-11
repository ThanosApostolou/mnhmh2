import { App } from "../App";
import { DBManager } from "../DBManager";
import { Borrower, BorrowerObj } from "./Borrower";
import { MaterialTab, MaterialTabObj } from "./MaterialTab";

export class DirectMaterialBorrower {
    Id: number;
    Quantity: number;
    Borrower: Borrower;
    MaterialTab: MaterialTab;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(dmb: DirectMaterialBorrower[]): string {
        return JSON.stringify(dmb);
    }

    static fromObject(obj: DirectMaterialBorrowerObj): DirectMaterialBorrower {
        const dmb: DirectMaterialBorrower = new DirectMaterialBorrower();
        dmb.Id = obj.Id;
        dmb.Quantity = obj.Quantity;
        dmb.Borrower = Borrower.fromObject(obj.Borrower);
        dmb.MaterialTab = MaterialTab.fromObject(obj.MaterialTab);
        return dmb;
    }

    static listFromObjectList(objlist: DirectMaterialBorrowerObj[]): DirectMaterialBorrower[] {
        const dmbs: DirectMaterialBorrower[] = [];
        for (const obj of objlist) {
            dmbs.push(DirectMaterialBorrower.fromObject(obj));
        }
        return dmbs;
    }

    static fromDBObject(obj: any, prefix: string): DirectMaterialBorrower {
        const dmb: DirectMaterialBorrower = new DirectMaterialBorrower();
        dmb.Id = obj[`${prefix}Id`];
        dmb.Quantity = obj[`${prefix}Quantity`];
        dmb.Borrower = Borrower.fromDBObject(obj, `${prefix}Borrowers.`);
        dmb.MaterialTab = MaterialTab.fromDBObject(obj, `${prefix}MaterialTabs.`);
        return dmb;
    }

    static listFromDBObjectList(objlist: any[], prefix: string): DirectMaterialBorrower[] {
        const dmbs: DirectMaterialBorrower[] = [];
        for (const obj of objlist) {
            dmbs.push(DirectMaterialBorrower.fromDBObject(obj, prefix));
        }
        return dmbs;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Quantity"];
    }

    private static _selectColumns(): string {
        const columns = "DirectMaterialBorrowers.Id as [DirectMaterialBorrowers.Id], DirectMaterialBorrowers.Quantity as [DirectMaterialBorrowers.Quantity]";
        return columns;
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(DirectMaterialBorrower._getOwnFieldsList(), prefix)} , Borrowers.*, MaterialTabs.*
            FROM DirectMaterialBorrowers
            LEFT JOIN ${Borrower.selectQuery(null, `${prefix}Borrowers.`)} as Borrowers
            ON DirectMaterialBorrowers.[Borrower] = Borrowers.[${prefix}Borrowers.Id]
            LEFT JOIN ${MaterialTab.selectQuery(null, `${prefix}MaterialTabs.`)} as MaterialTabs
            ON DirectMaterialBorrowers.[MaterialTab] = MaterialTabs.[${prefix}MaterialTabs.Id]
            ${wherestring})
        `;
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<DirectMaterialBorrower[]> {
        let dmbs: DirectMaterialBorrower[] = [];
        try {
            const result = await App.app.dbmanager.execute(DirectMaterialBorrower.selectQuery(whereclause, ""));
            dmbs = DirectMaterialBorrower.listFromDBObjectList(result.recordset, "");
            return dmbs;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}

export interface DirectMaterialBorrowerObj {
    Id: number;
    Quantity: number;
    Borrower: BorrowerObj;
    MaterialTab: MaterialTabObj;
}

export interface DirectMaterialBorrowerDBObj {
    "DirectMaterialBorrowers.Id": number;
    "DirectMaterialBorrowers.Quantity": number;
    "Borrowers.Id": number;
    "Borrowers.Name": string;
    "Borrowers.SerialNumber": number;
    "Managers.Id": number;
    "Managers.Name": string;
    "Managers.Rank": string;
    "Managers.Position": string;
    "MaterialTabs.Id": number;
    "MaterialTabs.PartialRegistryCode": string;
    "MaterialTabs.PartialRegistryCodeNumber": number;
    "MaterialTabs.AOEF": string;
    "MaterialTabs.Name": string;
    "MaterialTabs.MeasurementUnit": string;
    "MaterialTabs.TabRemainder": number;
    "MaterialTabs.Sum": number;
    "MaterialTabs.Difference": number;
    "MaterialTabs.Comments": string;
    "MaterialTabs.ImportSum": number;
    "MaterialTabs.ExportSum": number;
    "MaterialTabs.Found": number;
    "MaterialTabs.PendingCrediting": number;
    "MaterialTabs.Surplus": number;
    "MaterialTabs.Deficit": number;
    "MaterialTabs.Image": string;
    "MaterialTabs.GeneralRegistryCode": number;
    "MaterialTabs.Archived": boolean;
    "MaterialTabs.SerialNumber": number;
    "MaterialTabs.MaterialWithoutTab": boolean;
    "MaterialTabs.CurrentMaterialTab": boolean;
    "MaterialTabs.GEEFCode": string;
    "MaterialTabs.ComparativesPrintPage_MaterialTabs": number;
    "Groups.Id": number;
    "Groups.Name": string;
    "Groups.LastRegistryCode": number;
    "Groups.SerialNumber": number;
    "Categories.Id": number;
    "Categories.Name": string;
    "Categories.SerialNumber": number;
}