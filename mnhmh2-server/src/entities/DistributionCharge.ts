import { App } from "../App";

export class DistributionCharge {
    Id: number;
    PartialRegistryCode: string;
    AOEF: string;
    Category: string;
    Name: string;
    MeasurementUnit: string;
    Quantity: number;
    Comments: number;
    MaterialTabId: number;
    PartialRegistryCodeNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(distributioncharges: DistributionCharge[]) {
        return JSON.stringify(distributioncharges);
    }

    static fromObject(obj: any): DistributionCharge {
        const distributioncharges = new DistributionCharge();
        distributioncharges.Id = obj.Id;
        distributioncharges.PartialRegistryCode = obj.PartialRegistryCode;
        distributioncharges.AOEF = obj.AOEF;
        distributioncharges.Category = obj.Category;
        distributioncharges.Name = obj.Name;
        distributioncharges.MeasurementUnit = obj.MeasurementUnit;
        distributioncharges.Quantity = obj.Quantity;
        distributioncharges.Comments = obj.Comments;
        distributioncharges.MaterialTabId = obj.MaterialTabId;
        distributioncharges.PartialRegistryCodeNumber = obj.PartialRegistryCodeNumber;
        return distributioncharges;
    }

    static listFromObjectList(objlist: any[]): DistributionCharge[] {
        const distributioncharges: DistributionCharge[] = [];
        for (const obj of objlist) {
            distributioncharges.push(DistributionCharge.fromObject(obj));
        }
        return distributioncharges;
    }

    static async listSelectFromDB(): Promise<DistributionCharge[]> {
        let distributioncharges: DistributionCharge[] = [];
        try {
            const result = await App.app.dbmanager.execute("SELECT * FROM DistributionCharges");
            distributioncharges = DistributionCharge.listFromObjectList(result.recordset);
            return distributioncharges;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}