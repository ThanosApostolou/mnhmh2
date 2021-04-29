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

    static async listFromApi(cancelTokenSource: CancelTokenSource, search: string, withManager: boolean, managerId: number, notManagerId: number): Promise<Borrower[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/borrower",
                cancelToken: cancelTokenSource.token,
                params: {
                    search: search,
                    withManager: withManager,
                    managerId: managerId,
                    notManagerId: notManagerId
                }
            });
            const managers: Borrower[] = Borrower.listFromObjectList(response.data);
            return managers;
        } catch (error) {
            return error;
        }
    }
    static async insertToApi(cancelTokenSource: CancelTokenSource, borrower: Borrower): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/borrower",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    borrower: borrower
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async updateInApi(cancelTokenSource: CancelTokenSource, borrower: Borrower): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/borrower",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    borrower: borrower
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
                url: "/borrower",
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

    static getColumns(withManager: boolean): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA", width: 100, hide: false },
            { field: "Id", headerName: "Id", width: 100, hide: false },
            { field: "Name", headerName: "ΟΝΟΜΑ", width: 200, hide: false },
            { field: "SerialNumber", headerName: "ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ", width: 200, hide: false },
        ];
        if (withManager) {
            columns.push(
                { field: "ManagerId", headerName: "Id ΥΠΕΘΥΝΟΥ", width: 200, hide: false },
                { field: "ManagerName", headerName: "ΥΠΕΘΥΝΟΣ", width: 200, hide: false },
                { field: "ManagerPosition", headerName: "ΘΕΣΗ ΥΠΕΘΥΝΟΥ", width: 200, hide: false }
            );
        }
        return columns;
    }

    static getRows(borrowers: Borrower[], withManager: boolean): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const borrower of borrowers) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: borrower.Id,
                Name: borrower.Name,
                SerialNumber: borrower.SerialNumber,
            };
            if (withManager) {
                row.ManagerId = borrower.Manager ? borrower.Manager.Id : null;
                row.ManagerName = borrower.Manager ? borrower.Manager.Name : null;
                row.ManagerPosition = borrower.Manager ? borrower.Manager.Position : null;
            }
            count++;
            rows.push(row);
        }
        return rows;
    }
}