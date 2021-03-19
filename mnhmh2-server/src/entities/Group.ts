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
    static searchWhereclause(search: string, prefix: string): string {
        let whereclause = null;
        if (search !== "") {
            whereclause = `${prefix}Id LIKE '%${search}%' OR ${prefix}Name LIKE '%${search}%' OR ${prefix}LastRegistryCode LIKE '%${search}%' OR ${prefix}SerialNumber LIKE '%${search}%'`;
        }
        return whereclause;
    }
    static insertQuery(group: Group): string {
        const query = `
            INSERT INTO Groups (Id, Name, LastRegistryCode, SerialNumber)
            VALUES ('${group.Id}', '${group.Name}', '${group.LastRegistryCode}', '${group.SerialNumber}')
        `;
        return query;
    }
    static deleteQuery(Id: number): string {
        const query = `
            DELETE FROM Groups
            WHERE Id='${Id}'
        `;
        return query;
    }
    static updateQuery(group: Group): string {
        const query = `
            UPDATE Groups
            SET Name='${group.Name}', LastRegistryCode='${group.LastRegistryCode}', SerialNumber='${group.SerialNumber}'
            WHERE Id='${group.Id}'
        `;
        return query;
    }

    static async listSelectFromDB(search: string): Promise<Group[]> {
        let groups: Group[] = [];
        try {
            const whereclause = Group.searchWhereclause(search, "");
            const selectquery = Group.selectQuery(whereclause, "");
            const result = await App.app.dbmanager.execute(selectquery);
            const recordset: GroupObj[] = result.recordset;
            groups = Group.listFromDBObjectList(recordset, "");
            return groups;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(group: Group): Promise<Group> {
        try {
            const result1 = await App.app.dbmanager.execute("SELECT MAX(Id) FROM Groups");
            let maxId = 0;
            if (result1.recordset.length > 0) {
                maxId = result1.recordset[0][""];
            }
            group.Id = 1 + maxId;
            const result = await App.app.dbmanager.execute(Group.insertQuery(group));
            return group;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            const result = await App.app.dbmanager.execute(Group.deleteQuery(Id));
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(group: Group): Promise<Group> {
        try {
            const result = await App.app.dbmanager.execute(Group.updateQuery(group));
            return group;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export interface GroupObj {
    Id: number;
    Name: string;
    LastRegistryCode: number;
    SerialNumber: number;
}