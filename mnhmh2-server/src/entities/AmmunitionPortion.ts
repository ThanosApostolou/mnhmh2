import { App } from "../App";
import { DBManager } from "../DBManager";
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
        const portion = new AmmunitionPortion();
        portion.Id = obj.Id;
        portion.Name = obj.Name;
        portion.Quantity = obj.Quantity;
        portion.MaterialTab = obj.MaterialTab;
        portion.AmmunitionStore = obj.AmmunitionStore;
        return portion;
    }

    static listFromObjectList(objlist: any[]): AmmunitionPortion[] {
        const portions: AmmunitionPortion[] = [];
        for (const obj of objlist) {
            portions.push(AmmunitionPortion.fromObject(obj));
        }
        return portions;
    }

    static fromDBObject(obj: any, prefix: string): AmmunitionPortion {
        const portion = new AmmunitionPortion();
        portion.Id = obj[`${prefix}Id`];
        portion.Name = obj[`${prefix}Name`];
        portion.Quantity = obj[`${prefix}Quantity`];
        portion.MaterialTab = MaterialTab.fromDBObject(obj, `${prefix}MaterialTabs.`);
        portion.AmmunitionStore = AmmunitionStore.fromDBObject(obj, `${prefix}AmmunitionStores.`);
        return portion;
    }

    static listFromDBObjectList(objlist: any[], prefix: string): AmmunitionPortion[] {
        const portions: AmmunitionPortion[] = [];
        for (const obj of objlist) {
            portions.push(AmmunitionPortion.fromDBObject(obj, prefix));
        }
        return portions;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "Quantity"];
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(AmmunitionPortion._getOwnFieldsList(), prefix)} , MaterialTabs.*, AmmunitionStores.*
            FROM AmmunitionPortions
            LEFT JOIN ${MaterialTab.selectQuery(null, "MaterialTabs.")} as MaterialTabs
            ON AmmunitionPortions.[MaterialTab] = MaterialTabs.[${prefix}MaterialTabs.Id]
            LEFT JOIN ${AmmunitionStore.selectQuery(null, "AmmunitionStores.")} as AmmunitionStores
            ON AmmunitionPortions.[AmmunitionStore] = AmmunitionStores.[${prefix}AmmunitionStores.Id]
            ${wherestring})
        `;
        return query;
    }

    static async listSelectFromDB(): Promise<AmmunitionPortion[]> {
        let portions: AmmunitionPortion[] = [];
        try {
            const result = await App.app.dbmanager.execute(AmmunitionPortion.selectQuery(null, ""));
            portions = AmmunitionPortion.listFromDBObjectList(result.recordset, "");
            return portions;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}