import { App } from "../App";

export class AmmunitionPortion {
    Id: number;
    VersionTimestamp: string;
    Name: string;
    Quantity: number;
    MaterialTab: number;
    AmmunitionStore: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(portion: AmmunitionPortion[]) {
        return JSON.stringify(portion);
    }

    static fromObject(obj: any): AmmunitionPortion {
        const portion = new AmmunitionPortion();
        portion.Id = obj.APId;
        portion.VersionTimestamp = obj.VersionTimestamp;
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

    static async listSelectFromDB(): Promise<AmmunitionPortion[]> {
        let portions: AmmunitionPortion[] = [];
        try {
            const result = await App.app.dbmanager.execute("SELECT AP.* FROM AmmunitionPortions as AP");
            portions = AmmunitionPortion.listFromObjectList(result.recordset);
            return portions;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}