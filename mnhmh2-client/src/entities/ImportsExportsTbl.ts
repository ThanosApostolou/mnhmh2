import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";

import App from "../App";
import { Utils } from "../Utils";

import { MaterialTab } from "./MaterialTab";

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

    static fromObject(obj: any): ImportsExportsTbl {
        if (!obj) {
            return null;
        }
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
        const ietbls: ImportsExportsTbl[] = [];
        for (const obj of objlist) {
            ietbls.push(ImportsExportsTbl.fromObject(obj));
        }
        return ietbls;
    }

    static async listFromApi(cancelTokenSource: CancelTokenSource, Id: number, notId: number, fromDate: string, toDate: string, search: string, withMaterialTab: boolean, materialTabId: number, notMaterialTabId: number): Promise<ImportsExportsTbl[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/importsexportstbl",
                cancelToken: cancelTokenSource.token,
                params: {
                    Id: Id,
                    notId: notId,
                    fromDate: fromDate,
                    toDate: toDate,
                    search: search,
                    withMaterialTab: withMaterialTab,
                    materialTabId: materialTabId,
                    notMaterialTabId: notMaterialTabId
                }
            });
            if (!Utils.isIterable(response.data)) {
                throw response.data;
            }
            const importsexportstbls: ImportsExportsTbl[] = ImportsExportsTbl.listFromObjectList(response.data);
            return importsexportstbls;
        } catch (error) {
            console.log("ERROR", error);
            throw error;
        }
    }
    static async insertToApi(cancelTokenSource: CancelTokenSource, importsexportstbl: ImportsExportsTbl): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/importsexportstbl",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    importsexportstbl: importsexportstbl
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateInApi(cancelTokenSource: CancelTokenSource, importsexportstbl: ImportsExportsTbl): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/importsexportstbl",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    importsexportstbl: importsexportstbl
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
                url: "/importsexportstbl",
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
            { field: "Date", headerName: "ΗΜΕΡΟΜΗΝΙΑ", width: 200, hide: false },
            { field: "Unit", headerName: "ΜΟΝΑΔΑ", width: 200, hide: false },
            { field: "JustificationFileNumber", headerName: "ΑΡΙΘΜΟΣ ΔΙΚΑΙΟΛΟΓΗΣΗΣ ΑΡΧΕΙΟΥ", width: 200, hide: false },
            { field: "Imported", headerName: "ΕΙΣΑΧΘΗΚΕ", width: 200, hide: false },
            { field: "Exported", headerName: "ΕΞΑΧΘΗΚΕ", width: 200, hide: false },
            { field: "Remaining", headerName: "ΥΠΟΛΟΙΠΟ", width: 200, hide: false },
            { field: "Comments", headerName: "ΣΧΟΛΙΑ", width: 200, hide: false },
            { field: "MaterialTab", headerName: "ΟΝΟΜΑ ΚΑΡΤΕΛΑΣ ΥΛΙΚΟΥ", width: 200, hide: false },
        ];
        return columns;
    }

    static getRows(ietbls: ImportsExportsTbl[]): GridRowsProp {
        const rows: GridRowData[] = [];
        let count = 1;
        for (const ietbl of ietbls) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: ietbl.Id,
                Date: ietbl.Date,
                Unit: ietbl.Unit,
                JustificationFileNumber: ietbl.JustificationFileNumber,
                Imported: ietbl.Imported,
                Exported: ietbl.Exported,
                Remaining: ietbl.Remaining,
                Comments: ietbl.Comments,
                MaterialTab: ietbl.MaterialTab ? ietbl.MaterialTab.Name : null,
            };
            count++;
            rows.push(row);
        }
        return rows as GridRowsProp;

    }

}