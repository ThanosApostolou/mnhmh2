import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
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

    static async listFromApi(): Promise<AmmunitionPortion[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/ammunitionportion"
            });
            const portions: AmmunitionPortion[] = AmmunitionPortion.listFromObjectList(response.data);
            return portions;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "Name", headerName: "Name" },
            { field: "MaterialTab", headerName: "MaterialTab" },
            { field: "AmmunitionStore", headerName: "AmmunitionStore" }
        ];
        return columns;
    }

    static getRows(portions: AmmunitionPortion[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const portion of portions) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: portion.Id,
                Name: portion.Name,
                MaterialTab: portion.MaterialTab.PartialRegistryCode,
                AmmunitionStore: portion.AmmunitionStore.Name
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}