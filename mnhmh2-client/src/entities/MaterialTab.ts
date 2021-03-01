import { ColDef, RowData, RowsProp } from "@material-ui/data-grid";
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

    static getColumns(): ColDef[] {
        const columns: ColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "VersionTimestamp", headerName: "VersionTimestamp" },
            { field: "PartialRegistryCode", headerName: "PartialRegistryCode" },
            { field: "PartialRegistryCodeNumber", headerName: "PartialRegistryCodeNumber" },
            { field: "AOEF", headerName: "AOEF" },
            { field: "Name", headerName: "Name" },
            { field: "MeasurementUnit", headerName: "MeasurementUnit" },
            { field: "TabRemainder", headerName: "TabRemainder" },
            { field: "Sum", headerName: "Sum" },
            { field: "Difference", headerName: "Difference" },
            { field: "Comments", headerName: "Comments" },
            { field: "ImportSum", headerName: "ImportSum" },
            { field: "ExportSum", headerName: "ExportSum" },
            { field: "Found", headerName: "Found" },
            { field: "PendingCrediting", headerName: "PendingCrediting" },
            { field: "Surplus", headerName: "Surplus" },
            { field: "Deficit", headerName: "Deficit" },
            { field: "Image", headerName: "Image" },
            { field: "GeneralRegistryCode", headerName: "GeneralRegistryCode" },
            { field: "Archived", headerName: "Archived" },
            { field: "SerialNumber", headerName: "SerialNumber" },
            { field: "MaterialWithoutTab", headerName: "MaterialWithoutTab" },
            { field: "CurrentMaterialTab", headerName: "CurrentMaterialTab" },
            { field: "FEEFCode", headerName: "FEEFCode" },
            { field: "Group", headerName: "Group" },
            { field: "Category", headerName: "Category" },
            { field: "ComparativesPrintPage_MaterialTabs", headerName: "ComparativesPrintPage_MaterialTabs" },
        ];
        return columns;
    }

    static getRows(materialtabs: MaterialTab[]): RowsProp {
        const rows: RowsProp = [];
        let count = 0;
        for (const mt of materialtabs) {
            const row: RowData = {
                id: count,
                AA: count,
                Id: mt.Id,
                VersionTimestamp: JSON.stringify(mt.VersionTimestamp),
                PartialRegistryCode: mt.PartialRegistryCode,
                PartialRegistryCodeNumber: mt.PartialRegistryCodeNumber,
                AOEF: mt.AOEF,
                Name: mt.Name,
                MeasurementUnit: mt.MeasurementUnit,
                TabRemainder: mt.TabRemainder,
                Sum: mt.Sum,
                Difference: mt.Difference,
                Comments: mt.Comments,
                ImportSum: mt.ImportSum,
                ExportSum: mt.ExportSum,
                Found: mt.Found,
                PendingCrediting: mt.PendingCrediting,
                Surplus: mt.Surplus,
                Deficit: mt.Deficit,
                Image: mt.Image,
                GeneralRegistryCode: mt.GeneralRegistryCode,
                Archived: mt.Archived,
                SerialNumber: mt.SerialNumber,
                MaterialWithoutTab: mt.MaterialWithoutTab,
                CurrentMaterialTab: mt.CurrentMaterialTab,
                FEEFCode: mt.FEEFCode,
                Group: mt.Group,
                Category: mt.Category,
                ComparativesPrintPage_MaterialTabs: mt.ComparativesPrintPage_MaterialTabs
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}