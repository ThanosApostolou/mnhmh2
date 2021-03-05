import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import App from "../App";

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

    static async listFromApi(): Promise<DistributionCharge[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/distributioncharge"
            });
            const materialtabs: DistributionCharge[] = DistributionCharge.listFromObjectList(response.data);
            return materialtabs;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "PartialRegistryCode", headerName: "PartialRegistryCode" },
            { field: "AOEF", headerName: "AOEF" },
            { field: "Category", headerName: "Category" },
            { field: "Name", headerName: "Name" },
            { field: "MeasurementUnit", headerName: "MeasurementUnit" },
            { field: "Quantity", headerName: "Quantity" },
            { field: "Comments", headerName: "Comments" },
            { field: "MaterialTabId", headerName: "MaterialTabId" },
            { field: "PartialRegistryCodeNumber", headerName: "PartialRegistryCodeNumber" }
        ];
        return columns;
    }

    static getRows(distributioncharges: DistributionCharge[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 0;
        for (const dc of distributioncharges) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: dc.Id,
                PartialRegistryCode: dc.PartialRegistryCode,
                AOEF: dc.AOEF,
                Category: dc.Category,
                Name: dc.Name,
                MeasurementUnit: dc.MeasurementUnit,
                Quantity: dc.Quantity,
                Comments: dc.Comments,
                MaterialTabId: dc.MaterialTabId,
                PartialRegistryCodeNumber: dc.PartialRegistryCodeNumber
            };
            count++;
            rows.push(row);
        }
        return rows;

    }
}