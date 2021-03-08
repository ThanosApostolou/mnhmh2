import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import App from "../App";

export class AmmunitionStore {
    Id: number;
    VersionTimestamp: string;
    Name: string;
    SerialNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(store: AmmunitionStore[]) {
        return JSON.stringify(store);
    }

    static fromObject(obj: any): AmmunitionStore {
        const store = new AmmunitionStore();
        store.Id = obj.Id;
        store.VersionTimestamp = obj.VersionTimestamp;
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

    static async listFromApi(): Promise<AmmunitionStore[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/ammunitionstore"
            });
            const managers: AmmunitionStore[] = AmmunitionStore.listFromObjectList(response.data);
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
            { field: "SerialNumber", headerName: "SerialNumber" }
        ];
        return columns;
    }

    static getRows(stores: AmmunitionStore[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const store of stores) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: store.Id,
                VersionTimestamp: JSON.stringify(store.VersionTimestamp),
                Name: store.Name,
                SerialNumber: store.SerialNumber
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}