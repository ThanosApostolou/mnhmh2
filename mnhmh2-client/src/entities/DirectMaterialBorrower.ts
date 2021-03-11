import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { ApiConsumer } from "../ApiConsumer";
import { CancelTokenSource } from "axios";
import App from "../App";
import { Borrower } from "./Borrower";
import { MaterialTab } from "./MaterialTab";

export class DirectMaterialBorrower {
    Id: number;
    Quantity: number;
    Borrower: Borrower;
    MaterialTab: MaterialTab;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(dmb: DirectMaterialBorrower[]) {
        return JSON.stringify(dmb);
    }

    static fromObject(obj: any): DirectMaterialBorrower {
        const dmb = new DirectMaterialBorrower();
        dmb.Id = obj.Id;
        dmb.Quantity = obj.Quantity;
        dmb.Borrower = obj.Borrower;
        dmb.MaterialTab = obj.MaterialTab;
        return dmb;
    }

    static listFromObjectList(objlist: any[]): DirectMaterialBorrower[] {
        const dmbs: DirectMaterialBorrower[] = [];
        for (const obj of objlist) {
            dmbs.push(DirectMaterialBorrower.fromObject(obj));
        }
        return dmbs;
    }


    static async listFromApi(cancelTokenSource: CancelTokenSource): Promise<DirectMaterialBorrower[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/directmaterialborrower",
                cancelToken: cancelTokenSource.token
            });
            const dmbs: DirectMaterialBorrower[] = DirectMaterialBorrower.listFromObjectList(response.data);
            return dmbs;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "Quantity", headerName: "Quantity" },
            { field: "MaterialTabId", headerName: "MaterialTabId" },
            { field: "MaterialTabPartialRegistryCode", headerName: "MaterialTabPartialRegistryCode" },
            { field: "BorrowerId", headerName: "BorrowerId" },
            { field: "BorrowerName", headerName: "BorrowerName" },
        ];
        return columns;
    }

    static getRows(subcategories: DirectMaterialBorrower[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const subcategory of subcategories) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: subcategory.Id,
                Quantity: subcategory.Quantity,
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