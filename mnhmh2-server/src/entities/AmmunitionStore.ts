import { App } from "../App";
import { DBManager } from "../DBManager";

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

    static fromDBObject(obj: any, prefix: string): AmmunitionStore {
        const store = new AmmunitionStore();
        store.Id = obj[`${prefix}Id`];
        store.Name = obj[`${prefix}Name`];
        store.SerialNumber = obj[`${prefix}SerialNumber`];
        return store;
    }
    static listFromDBObjectList(objlist: any[], prefix: string): AmmunitionStore[] {
        const stores: AmmunitionStore[] = [];
        for (const obj of objlist) {
            stores.push(AmmunitionStore.fromDBObject(obj, prefix));
        }
        return stores;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "SerialNumber"];
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(AmmunitionStore._getOwnFieldsList(), prefix)}
            FROM AmmunitionStores
            ${wherestring})
        `;
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<AmmunitionStore[]> {
        let stores: AmmunitionStore[] = [];
        try {
            const result = await App.app.dbmanager.execute(AmmunitionStore.selectQuery(whereclause, ""));
            stores = AmmunitionStore.listFromDBObjectList(result.recordset, "");
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