import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import { Utils } from "../Utils";
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

    static listToJson(dmb: DirectMaterialBorrower[]): string {
        return JSON.stringify(dmb);
    }

    static fromObject(obj: any): DirectMaterialBorrower {
        if (!obj) {
            return null;
        }
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


    static async listFromApi(cancelTokenSource: CancelTokenSource, Id: number, notId: number, search: string, withMaterialTab: boolean, withBorrower: boolean, materialTabId: number, notMaterialTabId: number, borrowerId: number, notBorrowerId: number): Promise<DirectMaterialBorrower[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/directmaterialborrower",
                cancelToken: cancelTokenSource.token,
                params: {
                    Id: Id,
                    notId: notId,
                    search: search,
                    withMaterialTab: withMaterialTab,
                    withBorrower: withBorrower,
                    materialTabId: materialTabId,
                    notMaterialTabId: notMaterialTabId,
                    borrowerId: borrowerId,
                    notBorrowerId: notBorrowerId
                }
            });
            if (!Utils.isIterable(response.data)) {
                throw response.data;
            }
            const dmbs: DirectMaterialBorrower[] = DirectMaterialBorrower.listFromObjectList(response.data);
            return dmbs;
        } catch (error) {
            console.log("ERROR:", error);
            throw error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA", width: 100, hide: false },
            { field: "Id", headerName: "Id", width: 100, hide: false },
            { field: "Quantity", headerName: "ΠΟΣΟΤΗΤΑ", width: 200, hide: false },
            { field: "MaterialTabId", headerName: "ID ΚΑΡΤΕΛΑΣ ΥΛΙΚΟΥ", width: 200, hide: false },
            { field: "MaterialTabPartialRegistryCode", headerName: "ΜΕΡΙΚΟΣ ΚΩΔΙΚΑΣ ΕΓΓΡΑΦΗΣ ΚΑΡΤΕΛΑΣ ΥΛΙΚΟΥ", width: 200, hide: false },
            { field: "BorrowerId", headerName: "ID ΜΕΡΙΚΟΥ ΔΙΑΧΕΙΡΙΣΤΗ", width: 200, hide: false },
            { field: "BorrowerName", headerName: "ΟΝΟΜΑ ΜΕΡΙΚΟΥ ΔΙΑΧΕΙΡΙΣΤΗ", width: 200, hide: false },
        ];
        return columns;
    }

    static getRows(subcategories: DirectMaterialBorrower[]): GridRowsProp {
        const rows: GridRowData[] = [];
        let count = 1;
        for (const subcategory of subcategories) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: subcategory.Id,
                Quantity: subcategory.Quantity,
                MaterialTabId: subcategory.MaterialTab ? subcategory.MaterialTab.Id : null,
                MaterialTabPartialRegistryCode: subcategory.MaterialTab ? subcategory.MaterialTab.PartialRegistryCode : null,
                BorrowerId: subcategory.Borrower ? subcategory.Borrower.Id : null,
                BorrowerName: subcategory.Borrower ? subcategory.Borrower.Name : null,

            };
            count++;
            rows.push(row);
        }
        return rows as GridRowsProp;

    }

}