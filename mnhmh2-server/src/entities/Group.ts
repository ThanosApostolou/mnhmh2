import { App } from "../App";

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

    static fromDBObject(obj: GroupDBObj): Group {
        const group = new Group();
        group.Id = obj["Groups.Id"];
        group.Name = obj["Groups.Name"];
        group.LastRegistryCode = obj["Groups.LastRegistryCode"];
        group.SerialNumber = obj["Groups.SerialNumber"];
        return group;
    }
    static listFromDBObjectList(objlist: GroupDBObj[]): Group[] {
        const groups: Group[] = [];
        for (const obj of objlist) {
            groups.push(Group.fromDBObject(obj));
        }
        return groups;
    }

    private static _selectColumns(): string {
        const columns = "Groups.Id as [Groups.Id], Groups.Name as [Groups.Name], Groups.LastRegistryCode as [Groups.LastRegistryCode], Groups.SerialNumber as [Groups.SerialNumber]";
        return columns;
    }
    static selectQuery(whereclause: string): string {
        let query = `
            (SELECT ${Group._selectColumns()}
            FROM Groups
        `;
        if (whereclause != null) {
            query += " WHERE " + whereclause;
        }
        query += ")";
        return query;
    }
    static async listSelectFromDB(whereclause: string): Promise<Group[]> {
        let groups: Group[] = [];
        try {
            const result = await App.app.dbmanager.execute(Group.selectQuery(whereclause));
            groups = Group.listFromDBObjectList(result.recordset);
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
export interface GroupDBObj {
    "Groups.Id": number;
    "Groups.Name": string;
    "Groups.LastRegistryCode": number;
    "Groups.SerialNumber": number;
}