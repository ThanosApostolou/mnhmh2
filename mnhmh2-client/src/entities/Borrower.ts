import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import App from "../App";

export class Borrower {
    Id: number;
    VersionTimestamp: string;
    Name: string;
    SerialNumber: number;
    Manager: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(manager: Borrower[]) {
        return JSON.stringify(manager);
    }

    static fromObject(obj: any): Borrower {
        const borrower = new Borrower();
        borrower.Id = obj.Id;
        borrower.VersionTimestamp = obj.VersionTimestamp;
        borrower.Name = obj.Name;
        borrower.SerialNumber = obj.SerialNumber;
        borrower.Manager = obj.Manager;
        return borrower;
    }

    static listFromObjectList(objlist: any[]): Borrower[] {
        const borrowers: Borrower[] = [];
        for (const obj of objlist) {
            borrowers.push(Borrower.fromObject(obj));
        }
        return borrowers;
    }

    static async listFromApi(): Promise<Borrower[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/borrower"
            });
            const managers: Borrower[] = Borrower.listFromObjectList(response.data);
            return managers;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "VersionTimestamp", headerName: "VersionTimestamp" },
            { field: "Name", headerName: "Name" },
            { field: "SerialNumber", headerName: "SerialNumber" },
            { field: "Manager", headerName: "Manager" },
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
                VersionTimestamp: JSON.stringify(borrower.VersionTimestamp),
                Name: borrower.Name,
                SerialNumber: borrower.SerialNumber,
                Manager: borrower.Manager
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}