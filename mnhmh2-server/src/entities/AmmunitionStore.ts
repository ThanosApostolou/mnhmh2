import { App } from "../App";

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

    static async listSelectFromDB(): Promise<AmmunitionStore[]> {
        let stores: AmmunitionStore[] = [];
        try {
            const result = await App.app.dbmanager.execute("SELECT * FROM AmmunitionStores");
            stores = AmmunitionStore.listFromObjectList(result.recordset);
            return stores;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}