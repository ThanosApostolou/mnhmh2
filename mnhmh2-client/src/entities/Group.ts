import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import App from "../App";

export class Group {
    Id: number;
    Name: string;
    LastRegistryCode: number;
    SerialNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(groups: Group[]) {
        return JSON.stringify(groups);
    }

    static fromObject(obj: any): Group {
        const group = new Group();
        group.Id = obj.Id;
        group.Name = obj.Name;
        group.LastRegistryCode = obj.LastRegistryCode;
        group.SerialNumber = obj.SerialNumber;
        return group;
    }

    static listFromObjectList(objlist: any[]): Group[] {
        const groups: Group[] = [];
        for (const obj of objlist) {
            groups.push(Group.fromObject(obj));
        }
        return groups;
    }

    static async listFromApi(cancelTokenSource: CancelTokenSource): Promise<Group[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/group",
                cancelToken: cancelTokenSource.token
            });
            const groups: Group[] = Group.listFromObjectList(response.data);
            return groups;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "Name", headerName: "Name" },
            { field: "LastRegistryCode", headerName: "LastRegistryCode" },
            { field: "SerialNumber", headerName: "SerialNumber" },
        ];
        return columns;
    }

    static getRows(groups: Group[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const grp of groups) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: grp.Id,
                Name: grp.Name,
                LastRegistryCode: grp.LastRegistryCode,
                SerialNumber: grp.SerialNumber
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}