import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import { Utils } from "../Utils";
import App from "../App";
import { Category } from "./Category";
import { Group } from "./Group";

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
    //PendingCrediting: number;
    //Surplus: number;
    //Deficit: number;
    //Image: string;
    GeneralRegistryCode: number;
    Archived: boolean;
    SerialNumber: number;
    MaterialWithoutTab: boolean;
    CurrentMaterialTab: boolean;
    //GEEFCode: string;
    Group: Group;
    Category: Category;
    //ComparativesPrintPage_MaterialTabs: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(materialtabs: MaterialTab[]): string {
        return JSON.stringify(materialtabs);
    }

    static fromObject(obj: any): MaterialTab {
        if (!obj) {
            return null;
        }
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
        //materialtab.PendingCrediting = obj.PendingCrediting;
        //materialtab.Surplus = obj.Surplus;
        //materialtab.Deficit = obj.Deficit;
        //materialtab.Image = obj.Image;
        materialtab.GeneralRegistryCode = obj.GeneralRegistryCode;
        materialtab.Archived = obj.Archived;
        materialtab.SerialNumber = obj.SerialNumber;
        materialtab.MaterialWithoutTab = obj.MaterialWithoutTab;
        materialtab.CurrentMaterialTab = obj.CurrentMaterialTab;
        //materialtab.GEEFCode = obj.GEEFCode;
        materialtab.Group = Group.fromObject(obj.Group);
        materialtab.Category = Category.fromObject(obj.Category);
        //materialtab.ComparativesPrintPage_MaterialTabs = obj.ComparativesPrintPage_MaterialTabs;
        return materialtab;
    }

    static listFromObjectList(objlist: any[]): MaterialTab[] {
        const materialtabs: MaterialTab[] = [];
        for (const obj of objlist) {
            materialtabs.push(MaterialTab.fromObject(obj));
        }
        return materialtabs;
    }

    static async listFromApi(cancelTokenSource: CancelTokenSource, Id: number, notId: number, search: string, withGroup: boolean, withCategory: boolean, groupId: number, notGroupId: number, categoryId: number, notCategoryId: number): Promise<MaterialTab[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/materialtab",
                cancelToken: cancelTokenSource.token,
                params: {
                    Id: Id,
                    notId: notId,
                    search: search,
                    withGroup: withGroup,
                    withCategory: withCategory,
                    groupId: groupId,
                    notGroupId: notGroupId,
                    categoryId: categoryId,
                    notCategoryId: notCategoryId
                }
            });
            if (!Utils.isIterable(response.data)) {
                throw response.data;
            }
            const materialtabs: MaterialTab[] = MaterialTab.listFromObjectList(response.data);
            return materialtabs;
        } catch (error) {
            console.log("ERROR:", error);
            throw error;
        }
    }
    static async insertToApi(cancelTokenSource: CancelTokenSource, materialTab: MaterialTab): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/materialtab",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    materialTab: materialTab
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateInApi(cancelTokenSource: CancelTokenSource, materialTab: MaterialTab): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/materialtab",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    materialTab: materialTab
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async deleteInApi(cancelTokenSource: CancelTokenSource, Id: number): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "delete",
                url: "/materialtab",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    Id: Id
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA", width: 100, hide: false },
            { field: "Id", headerName: "Id", width: 100, hide: false },
            { field: "PartialRegistryCode", headerName: "ΕΦ24", width: 200, hide: false },
            { field: "PartialRegistryCodeNumber", headerName: "ΑΑΜΜ", width: 100, hide: false },
            { field: "AOEF", headerName: "ΑΟΕΦ", width: 200, hide: false },
            { field: "Name", headerName: "ΟΝΟΜΑ", width: 200, hide: false },
            { field: "MeasurementUnit", headerName: "ΜΟΝΑΔΑ ΜΕΤΡΗΣΗΣ", width: 200, hide: false },
            { field: "TabRemainder", headerName: "TabRemainder", width: 200, hide: false },
            { field: "Sum", headerName: "Sum", width: 200, hide: false },
            { field: "Difference", headerName: "Difference", width: 200, hide: false },
            { field: "Comments", headerName: "Comments", width: 200, hide: false },
            { field: "ImportSum", headerName: "ImportSum", width: 200, hide: false },
            { field: "ExportSum", headerName: "ExportSum", width: 200, hide: false },
            { field: "Found", headerName: "Found", width: 200, hide: false },
            //{ field: "PendingCrediting", headerName: "PendingCrediting", width: 200, hide: false },
            //{ field: "Surplus", headerName: "Surplus", width: 200, hide: false },
            //{ field: "Deficit", headerName: "Deficit", width: 200, hide: false },
            //{ field: "Image", headerName: "Image", width: 200, hide: false },
            { field: "GeneralRegistryCode", headerName: "GeneralRegistryCode", width: 200, hide: false },
            { field: "Archived", headerName: "Archived", width: 200, hide: false },
            { field: "SerialNumber", headerName: "SerialNumber", width: 200, hide: false },
            { field: "MaterialWithoutTab", headerName: "MaterialWithoutTab", width: 200, hide: false },
            { field: "CurrentMaterialTab", headerName: "CurrentMaterialTab", width: 200, hide: false },
            //{ field: "GEEFCode", headerName: "GEEFCode", width: 200, hide: false },
            { field: "Group", headerName: "ΟΜΑΔΑ", width: 200, hide: false },
            { field: "Category", headerName: "ΣΥΓΚΡΟΤΗΜΑ", width: 200, hide: false },
            //{ field: "ComparativesPrintPage_MaterialTabs", headerName: "ComparativesPrintPage_MaterialTabs", width: 200, hide: false },
        ];
        return columns;
    }

    static getRows(materialtabs: MaterialTab[]): GridRowsProp {
        const rows: GridRowData[] = [];
        let count = 1;
        for (const mt of materialtabs) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: mt.Id,
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
                //PendingCrediting: mt.PendingCrediting,
                //Surplus: mt.Surplus,
                //Deficit: mt.Deficit,
                //Image: mt.Image,
                GeneralRegistryCode: mt.GeneralRegistryCode,
                Archived: mt.Archived,
                SerialNumber: mt.SerialNumber,
                MaterialWithoutTab: mt.MaterialWithoutTab,
                CurrentMaterialTab: mt.CurrentMaterialTab,
                //GEEFCode: mt.GEEFCode,
                Group: mt.Group ? mt.Group.Name : null,
                Category: mt.Category ? mt.Category.Name : null,
                //ComparativesPrintPage_MaterialTabs: mt.ComparativesPrintPage_MaterialTabs
            };
            count++;
            rows.push(row);
        }
        return rows as GridRowsProp;

    }

}