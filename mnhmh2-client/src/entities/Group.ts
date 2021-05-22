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

    static listToJson(groups: Group[]): string {
        return JSON.stringify(groups);
    }

    static fromObject(obj: any): Group {
        if (!obj) {
            return null;
        }
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
    static async insertToApi(cancelTokenSource: CancelTokenSource, group: Group): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "post",
                url: "/group",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    group: group
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateInApi(cancelTokenSource: CancelTokenSource, group: Group): Promise<any> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "put",
                url: "/group",
                headers: {
                    "Content-Type": "application/json"
                },
                cancelToken: cancelTokenSource.token,
                data: {
                    group: group
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
                url: "/group",
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

    static async listFromApi(cancelTokenSource: CancelTokenSource, Id: number, notId: number, search: string): Promise<Group[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/group",
                cancelToken: cancelTokenSource.token,
                params: {
                    Id: Id,
                    notId: notId,
                    search: search
                }
            });
            const groups: Group[] = Group.listFromObjectList(response.data);
            return groups;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA", width: 100, hide: false },
            { field: "Id", headerName: "Id", width: 100, hide: false },
            { field: "Name", headerName: "ΟΝΟΜΑ", width: 200, hide: false },
            { field: "LastRegistryCode", headerName: "ΤΕΛΕΥΤΑΙΟΣ ΚΩΔΙΚΟΣ ΕΓΓΡΑΦΗΣ", width: 200, hide: false },
            { field: "SerialNumber", headerName: "ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ", width: 200, hide: false },
        ];
        return columns;
    }

    static getRows(groups: Group[]): GridRowsProp {
        const rows: GridRowData[] = [];
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
        return rows as GridRowsProp;

    }

}