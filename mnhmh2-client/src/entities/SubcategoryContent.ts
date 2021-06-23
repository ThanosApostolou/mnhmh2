import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import { Utils } from "../Utils";
import App from "../App";
import { MaterialTab } from "./MaterialTab";
import { Subcategory } from "./Subcategory";

export class SubcategoryContent {
    Id: number;
    Name: string;
    Quantity: number;
    SubcategoryBelongingTo: Subcategory;
    SubcategoryContentTab: MaterialTab;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(subcategoryContent: SubcategoryContent[]): string {
        return JSON.stringify(subcategoryContent);
    }

    static fromObject(obj: any): SubcategoryContent {
        if (!obj) {
            return null;
        }
        const subcategoryContent = new SubcategoryContent();
        subcategoryContent.Id = obj.Id;
        subcategoryContent.Name = obj.Name;
        subcategoryContent.Quantity = obj.Quantity;
        subcategoryContent.SubcategoryBelongingTo = obj.SubcategoryBelongingTo;
        subcategoryContent.SubcategoryContentTab = obj.SubcategoryContentTab;
        return subcategoryContent;
    }

    static listFromObjectList(objlist: any[]): SubcategoryContent[] {
        const subcategoryContents: SubcategoryContent[] = [];
        for (const obj of objlist) {
            subcategoryContents.push(SubcategoryContent.fromObject(obj));
        }
        return subcategoryContents;
    }

    static async listFromApi(cancelTokenSource: CancelTokenSource, Id: number, notId: number, search: string, withSubcategoryBelongingTo: boolean, withSubcategoryContentTab: boolean, subcategoryBelongingToId: number, notSubcategoryBelongingToId: number, subcategoryContentTabId: number, notSubcategoryContentTabId: number): Promise<SubcategoryContent[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/subcategorycontent",
                cancelToken: cancelTokenSource.token,
                params: {
                    Id: Id,
                    notId: notId,
                    search: search,
                    withSubcategoryBelongingTo: withSubcategoryBelongingTo,
                    withSubcategoryContentTab: withSubcategoryContentTab,
                    subcategoryBelongingToId: subcategoryBelongingToId,
                    notSubcategoryBelongingToId: notSubcategoryBelongingToId,
                    subcategoryContentTabId: subcategoryContentTabId,
                    notSubcategoryContentTabId: notSubcategoryContentTabId
                }
            });
            if (!Utils.isIterable(response.data)) {
                throw response.data;
            }
            const subcategoryContents: SubcategoryContent[] = SubcategoryContent.listFromObjectList(response.data);
            return subcategoryContents;
        } catch (error) {
            console.log("ERROR:", error);
            throw error;
        }
    }
    static async insertToApi(cancelTokenSource: CancelTokenSource, subcategoryContent: SubcategoryContent): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/subcategorycontent",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    subcategoryContent: subcategoryContent
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateInApi(cancelTokenSource: CancelTokenSource, subcategoryContent: SubcategoryContent): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/subcategorycontent",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    subcategoryContent: subcategoryContent
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
                url: "/subcategorycontent",
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
            { field: "Quantity", headerName: "ΠΟΣΟΤΗΤΑ", width: 200, hide: false },
            { field: "SubcategoryBelongingTo", headerName: "ΥΠΟΣΥΓΚΡΟΤΗΜΑ", width: 200, hide: false },
            { field: "SubcategoryContentTabPartialRegistryCodeNumber", headerName: "ΕΦ24", width: 200, hide: false },
            { field: "SubcategoryContentTabName", headerName: "ΟΝΟΜΑ ΚΑΡΤΕΛΑΣ ΥΛΙΚΟΥ", width: 200, hide: false },
        ];
        return columns;
    }

    static getRows(subcategoryContents: SubcategoryContent[]): GridRowsProp {
        const rows: GridRowData[] = [];
        let count = 1;
        for (const subcategoryContent of subcategoryContents) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: subcategoryContent.Id,
                Name: subcategoryContent.Name,
                Quantity: subcategoryContent.Quantity,
                SubcategoryBelongingTo: subcategoryContent.SubcategoryBelongingTo ? subcategoryContent.SubcategoryBelongingTo.Name : null,
                SubcategoryContentTabPartialRegistryCodeNumber: subcategoryContent.SubcategoryContentTab ? subcategoryContent.SubcategoryContentTab.PartialRegistryCodeNumber : null,
                SubcategoryContentTabName: subcategoryContent.SubcategoryContentTab ? subcategoryContent.SubcategoryContentTab.Name : null

            };
            count++;
            rows.push(row);
        }
        return rows as GridRowsProp;

    }

}