import { App } from "../App";
import { DBManager } from "../DBManager";
import { MaterialTab, MaterialTabObj } from "./MaterialTab";

export class ImportsExportsTbl {
    Id: number;
    Date: Date;
    Unit: string;
    JustificationFileNumber: string;
    Imported: number;
    Exported: number;
    Remaining: number;
    Comments: string;
    MaterialTab: MaterialTab;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(ietbl: ImportsExportsTbl[]): string {
        return JSON.stringify(ietbl);
    }

    static fromObject(obj: ImportsExportsTblObj): ImportsExportsTbl {
        const ietbl = new ImportsExportsTbl();
        ietbl.Id = obj.Id;
        ietbl.Date = obj.Date;
        ietbl.Unit = obj.Unit;
        ietbl.JustificationFileNumber = obj.JustificationFileNumber;
        ietbl.Imported = obj.Imported;
        ietbl.Exported = obj.Exported;
        ietbl.Remaining = obj.Remaining;
        ietbl.Comments = obj.Comments;
        ietbl.MaterialTab = MaterialTab.fromObject(obj.MaterialTab);
        return ietbl;
    }

    static listFromObjectList(objlist: any[]): ImportsExportsTbl[] {
        const borrowers: ImportsExportsTbl[] = [];
        for (const obj of objlist) {
            borrowers.push(ImportsExportsTbl.fromObject(obj));
        }
        return borrowers;
    }

    static fromDBObject(dbobj: any, prefix: string): ImportsExportsTbl {
        const ietbl = new ImportsExportsTbl();
        ietbl.Id = dbobj[`${prefix}Id`];
        ietbl.Date = dbobj[`${prefix}Date`];
        ietbl.Unit = dbobj[`${prefix}Unit`];
        ietbl.JustificationFileNumber = dbobj[`${prefix}JustificationFileNumber`];
        ietbl.Imported = dbobj[`${prefix}Imported`];
        ietbl.Exported = dbobj[`${prefix}Exported`];
        ietbl.Remaining = dbobj[`${prefix}Remaining`];
        ietbl.Comments = dbobj[`${prefix}Comments`];
        ietbl.MaterialTab = MaterialTab.fromDBObject(dbobj, `${prefix}MaterialTabs.`);
        return ietbl;
    }

    static listFromDBObjectList(objlist: any[], prefix: string): ImportsExportsTbl[] {
        const borrowers: ImportsExportsTbl[] = [];
        for (const dbobj of objlist) {
            borrowers.push(ImportsExportsTbl.fromDBObject(dbobj, prefix));
        }
        return borrowers;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Date", "Unit", "JustificationFileNumber", "Imported", "Exported", "Remaining", "Comments"];
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(ImportsExportsTbl._getOwnFieldsList(), prefix)}, MaterialTabs.*
            FROM ImportsExportsTbl
            LEFT JOIN ${MaterialTab.selectQuery(null, `${prefix}MaterialTabs.`)} as MaterialTabs
            ON ImportsExportsTbl.[MaterialTab] = MaterialTabs.[${prefix}MaterialTabs.Id]
            ${wherestring})
        `;
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<ImportsExportsTbl[]> {
        let ietbls: ImportsExportsTbl[] = [];
        try {
            const result = await App.app.dbmanager.execute(ImportsExportsTbl.selectQuery(whereclause, ""));
            const recordset: BorrowerDBObj[] = result.recordset;
            ietbls = ImportsExportsTbl.listFromDBObjectList(recordset, "");
            return ietbls;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}

export interface ImportsExportsTblObj {
    Id: number;
    Date: Date;
    Unit: string;
    JustificationFileNumber: string;
    Imported: number;
    Exported: number;
    Remaining: number;
    Comments: string;
    MaterialTab: MaterialTabObj;
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