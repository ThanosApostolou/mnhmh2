import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import { Utils } from "../Utils";
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

    static listToJson(subcategory: Subcategory[]): string {
        return JSON.stringify(subcategory);
    }

    static fromObject(obj: any): Subcategory {
        if (!obj) {
            return null;
        }
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

    static async listFromApi(cancelTokenSource: CancelTokenSource, Id: number, notId: number, search: string, withMaterialTab: boolean, withBorrower: boolean, materialTabId: number, notMaterialTabId: number, borrowerId: number, notBorrowerId: number): Promise<Subcategory[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/subcategory",
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
            const subcategories: Subcategory[] = Subcategory.listFromObjectList(response.data);
            return subcategories;
        } catch (error) {
            console.log("ERROR:", error);
            throw error;
        }
    }
    static async insertToApi(cancelTokenSource: CancelTokenSource, subcategory: Subcategory): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/subcategory",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    subcategory: subcategory
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateInApi(cancelTokenSource: CancelTokenSource, subcategory: Subcategory): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/subcategory",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    subcategory: subcategory
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
                url: "/subcategory",
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
            { field: "Name", headerName: "ΟΝΟΜΑ", width: 200, hide: false },
            { field: "MaterialTabId", headerName: "Id ΚΑΡΤΕΛΑΣ ΥΛΙΚΟΥ", width: 200, hide: false },
            { field: "MaterialTabPartialRegistryCode", headerName: "ΜΕΡΙΚΟΣ ΚΩΔΙΚΑΣ ΕΓΓΡΑΦΗΣ ΚΑΡΤΕΛΑΣ ΥΛΙΚΟΥ", width: 200, hide: false },
            { field: "BorrowerId", headerName: "Id ΜΕΡΙΚΟΥ ΔΙΑΧΕΙΡΙΣΤΗ", width: 200, hide: false },
            { field: "BorrowerName", headerName: "ΟΝΟΜΑ ΜΕΡΙΚΟΥ ΔΙΑΧΕΙΡΙΣΤΗ", width: 200, hide: false },
        ];
        return columns;
    }

    static getRows(subcategories: Subcategory[]): GridRowsProp {
        const rows: GridRowData[] = [];
        let count = 1;
        for (const subcategory of subcategories) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: subcategory.Id,
                Name: subcategory.Name,
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