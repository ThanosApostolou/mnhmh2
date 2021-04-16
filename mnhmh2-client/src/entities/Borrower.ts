import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import App from "../App";
import { Manager } from "./Manager";

export class Borrower {
    Id: number;
    Name: string;
    SerialNumber: number;
    Manager: Manager;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(manager: Borrower[]): string {
        return JSON.stringify(manager);
    }

    static fromObject(obj: any): Borrower {
        if (!obj) {
            return null;
        }
        const borrower = new Borrower();
        borrower.Id = obj.Id;
        borrower.Name = obj.Name;
        borrower.SerialNumber = obj.SerialNumber;
        borrower.Manager = Manager.fromObject(obj.Manager);
        return borrower;
    }

    static listFromObjectList(objlist: any[]): Borrower[] {
        const borrowers: Borrower[] = [];
        for (const obj of objlist) {
            borrowers.push(Borrower.fromObject(obj));
        }
        return borrowers;
    }

    static async listFromApi(cancelTokenSource: CancelTokenSource): Promise<Borrower[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/borrower",
                cancelToken: cancelTokenSource.token
            });
            const managers: Borrower[] = Borrower.listFromObjectList(response.data);
            return managers;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA", width: 100, hide: false },
            { field: "Id", headerName: "Id", width: 100, hide: false },
            { field: "Name", headerName: "ΟΝΟΜΑ", width: 200, hide: false },
            { field: "SerialNumber", headerName: "ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ", width: 200, hide: false },
            { field: "ManagerId", headerName: "Id ΥΠΕΘΥΝΟΥ", width: 200, hide: false },
            { field: "ManagerName", headerName: "ΥΠΕΘΥΝΟΣ", width: 200, hide: false },
        ];
        return columns;
    }

    static getRows(borrowers: Borrower[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const borrower of borrowers) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: borrower.Id,
                Name: borrower.Name,
                SerialNumber: borrower.SerialNumber,
                ManagerId: borrower.Manager.Id,
                ManagerName: borrower.Manager.Name
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}