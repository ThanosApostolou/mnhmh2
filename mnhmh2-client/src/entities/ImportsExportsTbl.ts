import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import App from "../App";
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

    static async listFromApi(): Promise<ImportsExportsTbl[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/importsexportstbl"
            });
            const materialtabs: ImportsExportsTbl[] = ImportsExportsTbl.listFromObjectList(response.data);
            return materialtabs;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "Date", headerName: "Date" },
            { field: "Unit", headerName: "Unit" },
            { field: "JustificationFileNumber", headerName: "JustificationFileNumber" },
            { field: "Imported", headerName: "Imported" },
            { field: "Exported", headerName: "Exported" },
            { field: "Remaining", headerName: "Remaining" },
            { field: "Comments", headerName: "Comments" },
            { field: "MaterialTab", headerName: "MaterialTab" },
        ];
        return columns;
    }

    static getRows(ietbls: ImportsExportsTbl[]): GridRowsProp {
        const rows: GridRowsProp = [];
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
                MaterialTab: ietbl.MaterialTab.Name,
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}