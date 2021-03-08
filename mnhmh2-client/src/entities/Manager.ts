import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import App from "../App";

export class Manager {
    Id: number;
    VersionTimestamp: string;
    Name: string;
    Rank: string;
    Position: string;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(manager: Manager[]) {
        return JSON.stringify(manager);
    }

    static fromObject(obj: any): Manager {
        const manager = new Manager();
        manager.Id = obj.Id;
        manager.VersionTimestamp = obj.VersionTimestamp;
        manager.Name = obj.Name;
        manager.Rank = obj.Rank;
        manager.Position = obj.Position;
        return manager;
    }

    static listFromObjectList(objlist: any[]): Manager[] {
        const managers: Manager[] = [];
        for (const obj of objlist) {
            managers.push(Manager.fromObject(obj));
        }
        return managers;
    }

    static async listFromApi(): Promise<Manager[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/manager"
            });
            const managers: Manager[] = Manager.listFromObjectList(response.data);
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
            { field: "Rank", headerName: "Rank" },
            { field: "Position", headerName: "Position" },
        ];
        return columns;
    }

    static getRows(managers: Manager[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const manager of managers) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: manager.Id,
                VersionTimestamp: JSON.stringify(manager.VersionTimestamp),
                Name: manager.Name,
                Rank: manager.Rank,
                Position: manager.Position
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}