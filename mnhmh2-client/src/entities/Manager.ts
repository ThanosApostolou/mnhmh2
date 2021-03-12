import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import App from "../App";

export class Manager {
    Id: number;
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

    static async listFromApi(cancelTokenSource: CancelTokenSource): Promise<Manager[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/manager",
                cancelToken: cancelTokenSource.token
            });
            const managers: Manager[] = Manager.listFromObjectList(response.data);
            return managers;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
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