import { App } from "../App";

export class Group {
    Id: number;
    VersionTimestamp: string;
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
        group.VersionTimestamp = obj.VersionTimestamp;
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

    static async listSelectFromDB(): Promise<Group[]> {
        let groups: Group[] = [];
        try {
            const result = await App.app.dbmanager.execute("SELECT * FROM Groups");
            groups = Group.listFromObjectList(result.recordset);
            return groups;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}