import { App } from "../App";
import { DBManager } from "../DBManager";
import { Category, CategoryObj } from "./Category";
import { Group, GroupObj } from "./Group";

export class MaterialTab {
    Id: number;
    PartialRegistryCode: string;
    PartialRegistryCodeNumber: number;
    AOEF: string;
    Name: string;
    MeasurementUnit: string;
    TabRemainder: number;
    Sum: number;
    Difference: number;
    Comments: string;
    ImportSum: number;
    ExportSum: number;
    Found: number;
    PendingCrediting: number;
    Surplus: number;
    Deficit: number;
    Image: string;
    GeneralRegistryCode: number;
    Archived: boolean;
    SerialNumber: number;
    MaterialWithoutTab: boolean;
    CurrentMaterialTab: boolean;
    GEEFCode: string;
    Group: Group;
    Category: Category;
    ComparativesPrintPage_MaterialTabs: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(materialtabs: MaterialTab[]): string {
        return JSON.stringify(materialtabs);
    }

    static fromObject(obj: MaterialTabObj): MaterialTab {
        const materialtab = new MaterialTab();
        materialtab.Id = obj.Id;
        materialtab.PartialRegistryCode = obj.PartialRegistryCode;
        materialtab.PartialRegistryCodeNumber = obj.PartialRegistryCodeNumber;
        materialtab.AOEF = obj.AOEF;
        materialtab.Name = obj.Name;
        materialtab.MeasurementUnit = obj.MeasurementUnit;
        materialtab.TabRemainder = obj.TabRemainder;
        materialtab.Sum = obj.Sum;
        materialtab.Difference = obj.Difference;
        materialtab.Comments = obj.Comments;
        materialtab.ImportSum = obj.ImportSum;
        materialtab.ExportSum = obj.ExportSum;
        materialtab.Found = obj.Found;
        materialtab.PendingCrediting = obj.PendingCrediting;
        materialtab.Surplus = obj.Surplus;
        materialtab.Deficit = obj.Deficit;
        materialtab.Image = obj.Image;
        materialtab.GeneralRegistryCode = obj.GeneralRegistryCode;
        materialtab.Archived = obj.Archived;
        materialtab.SerialNumber = obj.SerialNumber;
        materialtab.MaterialWithoutTab = obj.MaterialWithoutTab;
        materialtab.CurrentMaterialTab = obj.CurrentMaterialTab;
        materialtab.GEEFCode = obj.GEEFCode;
        materialtab.Group = Group.fromObject(obj.Group);
        materialtab.Category = Category.fromObject(obj.Category);
        materialtab.ComparativesPrintPage_MaterialTabs = obj.ComparativesPrintPage_MaterialTabs;
        return materialtab;
    }

    static listFromObjectList(objlist: MaterialTabObj[]): MaterialTab[] {
        const materialtabs: MaterialTab[] = [];
        for (const obj of objlist) {
            materialtabs.push(MaterialTab.fromObject(obj));
        }
        return materialtabs;
    }

    static fromDBObject(obj: any, prefix: string): MaterialTab {
        const materialtab = new MaterialTab();
        materialtab.Id = obj[`${prefix}Id`];
        materialtab.PartialRegistryCode = obj[`${prefix}PartialRegistryCode`];
        materialtab.PartialRegistryCodeNumber = obj[`${prefix}PartialRegistryCodeNumber`];
        materialtab.AOEF = obj[`${prefix}AOEF`];
        materialtab.Name = obj[`${prefix}Name`];
        materialtab.MeasurementUnit = obj[`${prefix}MeasurementUnit`];
        materialtab.TabRemainder = obj[`${prefix}TabRemainder`];
        materialtab.Sum = obj[`${prefix}Sum`];
        materialtab.Difference = obj[`${prefix}Difference`];
        materialtab.Comments = obj[`${prefix}Comments`];
        materialtab.ImportSum = obj[`${prefix}ImportSum`];
        materialtab.ExportSum = obj[`${prefix}ExportSum`];
        materialtab.Found = obj[`${prefix}Found`];
        materialtab.PendingCrediting = obj[`${prefix}PendingCrediting`];
        materialtab.Surplus = obj[`${prefix}Surplus`];
        materialtab.Deficit = obj[`${prefix}Deficit`];
        materialtab.Image = obj[`${prefix}Image`];
        materialtab.GeneralRegistryCode = obj[`${prefix}GeneralRegistryCode`];
        materialtab.Archived = obj[`${prefix}Archived`];
        materialtab.SerialNumber = obj[`${prefix}SerialNumber`];
        materialtab.MaterialWithoutTab = obj[`${prefix}MaterialWithoutTab`];
        materialtab.CurrentMaterialTab = obj[`${prefix}CurrentMaterialTab`];
        materialtab.GEEFCode = obj[`${prefix}GEEFCode`];
        materialtab.Group = Group.fromDBObject(obj, `${prefix}Groups.`);
        materialtab.Category = Category.fromDBObject(obj, `${prefix}Categories.`);
        materialtab.ComparativesPrintPage_MaterialTabs = obj[`${prefix}ComparativesPrintPage_MaterialTabs`];
        return materialtab;
    }


    static listFromDBObjectList(objlist: any[], prefix: string): MaterialTab[] {
        const materialtabs: MaterialTab[] = [];
        for (const dbobj of objlist) {
            materialtabs.push(MaterialTab.fromDBObject(dbobj, prefix));
        }
        return materialtabs;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "PartialRegistryCode", "PartialRegistryCodeNumber",
            "AOEF", "Name", "MeasurementUnit", "TabRemainder", "Sum", "Difference", "Comments", "ImportSum", "ExportSum", "Found",
            "PendingCrediting", "Surplus", "Deficit", "Image", "GeneralRegistryCode", "Archived", "SerialNumber", "MaterialWithoutTab",
            "CurrentMaterialTab", "GEEFCode", "ComparativesPrintPage_MaterialTabs"];
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(MaterialTab._getOwnFieldsList(), prefix)} , Groups.* , Categories.*
            FROM MaterialTabs
            LEFT JOIN ${Group.selectQuery(null, `${prefix}Groups.`)} as Groups
            ON MaterialTabs.[Group] = Groups.[${prefix}Groups.Id]
            LEFT JOIN ${Category.selectQuery(null, `${prefix}Categories.`)} as Categories
            ON MaterialTabs.[Category] = Categories.[${prefix}Categories.Id]
            ${wherestring})
        `;
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<MaterialTab[]> {
        let materialtabs: MaterialTab[] = [];
        try {
            const result = await App.app.dbmanager.execute(MaterialTab.selectQuery(whereclause, ""));
            const recordset: MaterialTabDBObj[] = result.recordset;
            materialtabs = MaterialTab.listFromDBObjectList(recordset, "");
            return materialtabs;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}

export interface MaterialTabObj {
    Id: number;
    PartialRegistryCode: string;
    PartialRegistryCodeNumber: number;
    AOEF: string;
    Name: string;
    MeasurementUnit: string;
    TabRemainder: number;
    Sum: number;
    Difference: number;
    Comments: string;
    ImportSum: number;
    ExportSum: number;
    Found: number;
    PendingCrediting: number;
    Surplus: number;
    Deficit: number;
    Image: string;
    GeneralRegistryCode: number;
    Archived: boolean;
    SerialNumber: number;
    MaterialWithoutTab: boolean;
    CurrentMaterialTab: boolean;
    GEEFCode: string;
    Group: GroupObj;
    Category: CategoryObj;
    ComparativesPrintPage_MaterialTabs: number;
}

export interface MaterialTabDBObj {
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