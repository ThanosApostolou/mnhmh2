import { App } from "../App";
import { DBManager } from "../DBManager";

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

    static fromObject(obj: GroupObj): Group {
        const group = new Group();
        group.Id = obj.Id;
        group.Name = obj.Name;
        group.LastRegistryCode = obj.LastRegistryCode;
        group.SerialNumber = obj.SerialNumber;
        return group;
    }

    static listFromObjectList(objlist: GroupObj[]): Group[] {
        const groups: Group[] = [];
        for (const obj of objlist) {
            groups.push(Group.fromObject(obj));
        }
        return groups;
    }

    static fromDBObject(obj: any, prefix: string): Group {
        const group = new Group();
        group.Id = obj[`${prefix}Id`];
        group.Name = obj[`${prefix}Name`];
        group.LastRegistryCode = obj[`${prefix}LastRegistryCode`];
        group.SerialNumber = obj[`${prefix}SerialNumber`];
        return group;
    }
    static listFromDBObjectList(objlist: any[], prefix: string): Group[] {
        const groups: Group[] = [];
        for (const obj of objlist) {
            groups.push(Group.fromDBObject(obj, prefix));
        }
        return groups;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "LastRegistryCode", "SerialNumber"];
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(Group._getOwnFieldsList(), prefix)}
            FROM Groups
            ${wherestring})
        `;
        return query;
    }
    static async listSelectFromDB(whereclause: string): Promise<Group[]> {
        let groups: Group[] = [];
        try {
            const result = await App.app.dbmanager.execute(Group.selectQuery(whereclause, ""));
            const recordset: GroupObj[] = result.recordset;
            groups = Group.listFromDBObjectList(recordset, "");
            return groups;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}

export interface GroupObj {
    Id: number;
    Name: string;
    LastRegistryCode: number;
    SerialNumber: number;
}