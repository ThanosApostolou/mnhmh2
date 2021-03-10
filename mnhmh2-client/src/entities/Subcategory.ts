import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import App from "../App";
import { Borrower } from "./Borrower";
import { MaterialTab } from "./MaterialTab";

export class Subcategory {
    Id: number;
    Name: string;
    MaterialTab: MaterialTab;
    Borrower: Borrower;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(subcategory: Subcategory[]) {
        return JSON.stringify(subcategory);
    }

    static fromObject(obj: any): Subcategory {
        const subcategory = new Subcategory();
        subcategory.Id = obj.Id;
        subcategory.Name = obj.Name;
        subcategory.MaterialTab = obj.MaterialTab;
        subcategory.Borrower = obj.Borrower;
        return subcategory;
    }

    static listFromObjectList(objlist: any[]): Subcategory[] {
        const subcategories: Subcategory[] = [];
        for (const obj of objlist) {
            subcategories.push(Subcategory.fromObject(obj));
        }
        return subcategories;
    }

    static async listFromApi(): Promise<Subcategory[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/subcategory"
            });
            const subcategories: Subcategory[] = Subcategory.listFromObjectList(response.data);
            return subcategories;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "Name", headerName: "Name" },
            { field: "MaterialTabId", headerName: "MaterialTabId" },
            { field: "MaterialTabPartialRegistryCode", headerName: "MaterialTabPartialRegistryCode" },
            { field: "BorrowerId", headerName: "BorrowerId" },
            { field: "BorrowerName", headerName: "BorrowerName" },
        ];
        return columns;
    }

    static getRows(subcategories: Subcategory[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const subcategory of subcategories) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: subcategory.Id,
                Name: subcategory.Name,
                MaterialTabId: subcategory.MaterialTab.Id,
                MaterialTabPartialRegistryCode: subcategory.MaterialTab.PartialRegistryCode,
                BorrowerId: subcategory.Borrower.Id,
                BorrowerName: subcategory.Borrower.Name,

            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}