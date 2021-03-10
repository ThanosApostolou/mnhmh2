import { App } from "../App";
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

    static fromDBObject(obj: MaterialTabDBObj): MaterialTab {
        const materialtab = new MaterialTab();
        materialtab.Id = obj["MaterialTabs.Id"];
        materialtab.PartialRegistryCode = obj["MaterialTabs.PartialRegistryCode"];
        materialtab.PartialRegistryCodeNumber = obj["MaterialTabs.PartialRegistryCodeNumber"];
        materialtab.AOEF = obj["MaterialTabs.AOEF"];
        materialtab.Name = obj["MaterialTabs.Name"];
        materialtab.MeasurementUnit = obj["MaterialTabs.MeasurementUnit"];
        materialtab.TabRemainder = obj["MaterialTabs.TabRemainder"];
        materialtab.Sum = obj["MaterialTabs.Sum"];
        materialtab.Difference = obj["MaterialTabs.Difference"];
        materialtab.Comments = obj["MaterialTabs.Comments"];
        materialtab.ImportSum = obj["MaterialTabs.ImportSum"];
        materialtab.ExportSum = obj["MaterialTabs.ExportSum"];
        materialtab.Found = obj["MaterialTabs.Found"];
        materialtab.PendingCrediting = obj["MaterialTabs.PendingCrediting"];
        materialtab.Surplus = obj["MaterialTabs.Surplus"];
        materialtab.Deficit = obj["MaterialTabs.Deficit"];
        materialtab.Image = obj["MaterialTabs.Image"];
        materialtab.GeneralRegistryCode = obj["MaterialTabs.GeneralRegistryCode"];
        materialtab.Archived = obj["MaterialTabs.Archived"];
        materialtab.SerialNumber = obj["MaterialTabs.SerialNumber"];
        materialtab.MaterialWithoutTab = obj["MaterialTabs.MaterialWithoutTab"];
        materialtab.CurrentMaterialTab = obj["MaterialTabs.CurrentMaterialTab"];
        materialtab.GEEFCode = obj["MaterialTabs.GEEFCode"];
        materialtab.Group = Group.fromDBObject(obj);
        materialtab.Category = Category.fromDBObject(obj);
        materialtab.ComparativesPrintPage_MaterialTabs = obj["MaterialTabs.ComparativesPrintPage_MaterialTabs"];
        return materialtab;
    }


    static listFromDBObjectList(objlist: MaterialTabDBObj[]): MaterialTab[] {
        const materialtabs: MaterialTab[] = [];
        for (const dbobj of objlist) {
            materialtabs.push(MaterialTab.fromDBObject(dbobj));
        }
        return materialtabs;
    }

    private static _selectColumns(): string {
        const column_list = ["Id", "PartialRegistryCode", "PartialRegistryCodeNumber",
            "AOEF", "Name", "MeasurementUnit", "TabRemainder", "Sum", "Difference", "Comments", "ImportSum", "ExportSum", "Found",
            "PendingCrediting", "Surplus", "Deficit", "Image", "GeneralRegistryCode", "Archived", "SerialNumber", "MaterialWithoutTab",
            "CurrentMaterialTab", "GEEFCode", "ComparativesPrintPage_MaterialTabs"];

        let columns = "";
        for (const [index, item] of column_list.entries()) {
            columns += " MaterialTabs." + item + " as [MaterialTabs." + item + "]";
            if (index + 1 < column_list.length) {
                columns += ",";
            }
        }
        return columns;
    }

    static selectQuery(whereclause: string): string {
        let query = `
            (SELECT ${MaterialTab._selectColumns()} , Groups.* , Categories.*
            FROM MaterialTabs
            LEFT JOIN ${Group.selectQuery(null)} as Groups
            ON MaterialTabs.[Group] = Groups.[Groups.Id]
            LEFT JOIN ${Category.selectQuery(null)} as Categories
            ON MaterialTabs.[Category] = Categories.[Categories.Id]
        `;
        if (whereclause != null) {
            query += " WHERE " + whereclause;
        }
        query += ")";
        console.log("query: \n", query);
        return query;
    }
    static async listSelectFromDB(whereclause: string): Promise<MaterialTab[]> {
        let materialtabs: MaterialTab[] = [];
        try {
            const result = await App.app.dbmanager.execute(MaterialTab.selectQuery(whereclause));
            materialtabs = MaterialTab.listFromDBObjectList(result.recordset);
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