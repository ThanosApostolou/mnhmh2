import { GridColDef, GridRowData, GridRowsProp, GridCellParams } from "@material-ui/data-grid";
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

    static listToJson(manager: Manager[]): string {
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

    static async insertToApi(cancelTokenSource: CancelTokenSource, manager: Manager): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/manager",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    manager: manager
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateInApi(cancelTokenSource: CancelTokenSource, manager: Manager): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/manager",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    manager: manager
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async deleteInApi(cancelTokenSource: CancelTokenSource, Id: number): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "delete",
                url: "/manager",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    Id: Id
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async listFromApi(cancelTokenSource: CancelTokenSource, search: string): Promise<Manager[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/manager",
                cancelToken: cancelTokenSource.token,
                params: {
                    search: search
                }
            });
            console.log("response", response);
            const managers: Manager[] = Manager.listFromObjectList(response.data);
            return managers;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA", width: 100, hide: false },
            { field: "Id", headerName: "Id", width: 100, hide: false },
            { field: "Name", headerName: "ΟΝΟΜΑ", width: 200, hide: false },
            { field: "Rank", headerName: "ΒΑΘΜΟΣ", width: 200, hide: false },
            { field: "Position", headerName: "ΘΕΣΗ", width: 200, hide: false },
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