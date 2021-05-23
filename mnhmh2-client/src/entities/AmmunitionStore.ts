import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import App from "../App";

export class AmmunitionStore {
    Id: number;
    Name: string;
    SerialNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(store: AmmunitionStore[]): string {
        return JSON.stringify(store);
    }

    static fromObject(obj: any): AmmunitionStore {
        if (!obj) {
            return null;
        }
        const store = new AmmunitionStore();
        store.Id = obj.Id;
        store.Name = obj.Name;
        store.SerialNumber = obj.SerialNumber;
        return store;
    }

    static listFromObjectList(objlist: any[]): AmmunitionStore[] {
        const stores: AmmunitionStore[] = [];
        for (const obj of objlist) {
            stores.push(AmmunitionStore.fromObject(obj));
        }
        return stores;
    }

    static async listFromApi(cancelTokenSource: CancelTokenSource, Id: number, notId: number, search: string): Promise<AmmunitionStore[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/ammunitionstore",
                cancelToken: cancelTokenSource.token,
                params: {
                    Id: Id,
                    notId: notId,
                    search: search
                }
            });
            const stores: AmmunitionStore[] = AmmunitionStore.listFromObjectList(response.data);
            return stores;
        } catch (error) {
            return error;
        }
    }

    static async insertToApi(cancelTokenSource: CancelTokenSource, store: AmmunitionStore): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/ammunitionstore",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    store: store
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateInApi(cancelTokenSource: CancelTokenSource, store: AmmunitionStore): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/ammunitionstore",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    store: store
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
                url: "/ammunitionstore",
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
            { field: "SerialNumber", headerName: "ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ", width: 200, hide: false }
        ];
        return columns;
    }

    static getRows(stores: AmmunitionStore[]): GridRowsProp {
        const rows: GridRowData[] = [];
        let count = 1;
        for (const store of stores) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: store.Id,
                Name: store.Name,
                SerialNumber: store.SerialNumber
            };
            count++;
            rows.push(row);
        }
        return rows as GridRowsProp;

    }

}