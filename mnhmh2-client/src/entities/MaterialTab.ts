import { ColDef } from "@material-ui/data-grid";
import { AxiosResponse } from "axios";
import App from "../App";

export class MaterialTab {
    Id: number;
    VersionTimestamp: string;
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
    FEEFCode: string;
    Group: number;
    Category: number;
    ComparativesPrintPage_MaterialTabs: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(materialtabs: MaterialTab[]) {
        return JSON.stringify(materialtabs);
    }

    static fromObject(obj: any): MaterialTab {
        const materialtab = new MaterialTab();
        materialtab.Id = obj.Id;
        materialtab.VersionTimestamp = obj.VersionTimestamp;
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
        materialtab.FEEFCode = obj.FEEFCode;
        materialtab.Group = obj.Group;
        materialtab.Category = obj.Category;
        materialtab.ComparativesPrintPage_MaterialTabs = obj.ComparativesPrintPage_MaterialTabs;
        return materialtab;
    }

    static listFromObjectList(objlist: any[]): MaterialTab[] {
        const materialtabs: MaterialTab[] = [];
        for (const obj of objlist) {
            materialtabs.push(MaterialTab.fromObject(obj));
        }
        return materialtabs;
    }

    static async listFromApi(): Promise<MaterialTab[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/materialtab"
            });
            const materialtabs: MaterialTab[] = MaterialTab.listFromObjectList(response.data);
            return materialtabs;
        } catch (error) {
            return error;
        }
    }

    static listToColsRows(materialtabs: MaterialTab[]) {
        const columns: ColDef[] = [
            { field: "AA", headerName: "AA", flex: 1 },
            { field: "Id", headerName: "Id", flex: 1 },
            { field: "col2", headerName: "Column 2", flex: 1 },
            { field: "col3", headerName: "Column 3", flex: 1 },
        ];

    }

}