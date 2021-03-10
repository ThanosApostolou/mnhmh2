import { App } from "../App";

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

    static fromObject(obj: AmmunitionStoreObj): AmmunitionStore {
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

    static fromDBObject(obj: AmmunitionStoreDBObj): AmmunitionStore {
        const store = new AmmunitionStore();
        store.Id = obj["AmmunitionStores.Id"];
        store.Name = obj["AmmunitionStores.Name"];
        store.SerialNumber = obj["AmmunitionStores.SerialNumber"];
        return store;
    }
    static listFromDBObjectList(objlist: AmmunitionStoreDBObj[]): AmmunitionStore[] {
        const stores: AmmunitionStore[] = [];
        for (const obj of objlist) {
            stores.push(AmmunitionStore.fromDBObject(obj));
        }
        return stores;
    }

    private static _selectColumns(): string {
        const columns = "AmmunitionStores.Id as [AmmunitionStores.Id], AmmunitionStores.Name as [AmmunitionStores.Name], AmmunitionStores.SerialNumber as [AmmunitionStores.SerialNumber]";
        return columns;
    }
    static selectQuery(whereclause: string): string {
        let query = " \
            (SELECT " + AmmunitionStore._selectColumns() + " \
            FROM AmmunitionStores";
        if (whereclause != null) {
            query += " WHERE " + whereclause;
        }
        query += ")";
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<AmmunitionStore[]> {
        let stores: AmmunitionStore[] = [];
        try {
            const result = await App.app.dbmanager.execute(AmmunitionStore.selectQuery(whereclause));
            stores = AmmunitionStore.listFromDBObjectList(result.recordset);
            return stores;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}

export interface AmmunitionStoreObj {
    Id: number;
    Name: string;
    SerialNumber: number;
}
export interface AmmunitionStoreDBObj {
    "AmmunitionStores.Id": number;
    "AmmunitionStores.Name": string;
    "AmmunitionStores.SerialNumber": number;
}