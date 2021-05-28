import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import { Utils } from "../Utils";
import App from "../App";
import { AmmunitionStore } from "./AmmunitionStore";
import { MaterialTab } from "./MaterialTab";

export class AmmunitionPortion {
    Id: number;
    Name: string;
    Quantity: number;
    MaterialTab: MaterialTab;
    AmmunitionStore: AmmunitionStore;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(portion: AmmunitionPortion[]): string {
        return JSON.stringify(portion);
    }

    static fromObject(obj: any): AmmunitionPortion {
        if (!obj) {
            return null;
        }
        const portion = new AmmunitionPortion();
        portion.Id = obj.Id;
        portion.Name = obj.Name;
        portion.Quantity = obj.Quantity;
        portion.MaterialTab = MaterialTab.fromObject(obj.MaterialTab);
        portion.AmmunitionStore = AmmunitionStore.fromObject(obj.AmmunitionStore);
        return portion;
    }

    static listFromObjectList(objlist: any[]): AmmunitionPortion[] {
        const portions: AmmunitionPortion[] = [];
        for (const obj of objlist) {
            portions.push(AmmunitionPortion.fromObject(obj));
        }
        return portions;
    }

    static async listFromApi(cancelTokenSource: CancelTokenSource, Id: number, notId: number, search: string,
        withAmmunitionStore: boolean, withMaterialTab: boolean, ammunitionStoreId: number, notAmmunitionStoreId: number,
        materialTabId: number, notMaterialTabId: number): Promise<AmmunitionPortion[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/ammunitionportion",
                cancelToken: cancelTokenSource.token,
                params: {
                    Id: Id,
                    notId: notId,
                    search: search,
                    withAmmunitionStore: withAmmunitionStore,
                    withMaterialTab: withMaterialTab,
                    ammunitionStoreId: ammunitionStoreId,
                    notAmmunitionStoreId: notAmmunitionStoreId,
                    materialTabId: materialTabId,
                    notMaterialTabId: notMaterialTabId
                }
            });
            if (!Utils.isIterable(response.data)) {
                throw response.data;
            }
            const portions: AmmunitionPortion[] = AmmunitionPortion.listFromObjectList(response.data);
            return portions;
        } catch (error) {
            console.log("ERROR:", error);
            throw error;
        }
    }
    static async insertToApi(cancelTokenSource: CancelTokenSource, portion: AmmunitionPortion): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/ammunitionportion",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    portion: portion
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateInApi(cancelTokenSource: CancelTokenSource, portion: AmmunitionPortion): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/ammunitionportion",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    portion: portion
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
                url: "/ammunitionportion",
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
            { field: "MaterialTab", headerName: "ΚΑΡΤΕΛΑ ΥΛΙΚΟΥ", width: 200, hide: false },
            { field: "AmmunitionStore", headerName: "ΑΠΟΘΗΚΗ", width: 200, hide: false }
        ];
        return columns;
    }

    static getRows(portions: AmmunitionPortion[]): GridRowsProp {
        const rows: GridRowData[] = [];
        let count = 1;
        for (const portion of portions) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: portion.Id,
                Name: portion.Name,
                MaterialTab: portion.MaterialTab ? portion.MaterialTab.PartialRegistryCode : null,
                AmmunitionStore: portion.AmmunitionStore ? portion.AmmunitionStore.Name : null
            };
            count++;
            rows.push(row);
        }
        return rows as GridRowsProp;

    }

}