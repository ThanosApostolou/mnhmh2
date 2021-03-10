import { App } from "../App";

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

    static fromObject(obj: ManagerObj): Manager {
        const manager = new Manager();
        manager.Id = obj.Id;
        manager.Name = obj.Name;
        manager.Rank = obj.Rank;
        manager.Position = obj.Position;
        return manager;
    }

    static listFromObjectList(objlist: ManagerObj[]): Manager[] {
        const managers: Manager[] = [];
        for (const obj of objlist) {
            managers.push(Manager.fromObject(obj));
        }
        return managers;
    }

    static fromDBObject(dbobj: ManagerDBObj): Manager {
        const manager: Manager = new Manager();
        manager.Id = dbobj["Managers.Id"];
        manager.Name = dbobj["Managers.Name"];
        manager.Rank = dbobj["Managers.Rank"];
        manager.Position = dbobj["Managers.Position"];
        return manager;
    }

    static listFromDBObjectList(objlist: ManagerDBObj[]): Manager[] {
        const managers: Manager[] = [];
        for (const obj of objlist) {
            managers.push(Manager.fromDBObject(obj));
        }
        return managers;
    }

    private static _selectColumns(): string {
        const columns = "Managers.Id as [Managers.Id], Managers.Name as [Managers.Name], Managers.Rank as [Managers.Rank], Managers.Position as [Managers.Position]";
        return columns;
    }
    static selectQuery(whereclause: string): string {
        let query = " \
            (SELECT " + Manager._selectColumns() + " \
            FROM Managers";
        if (whereclause != null) {
            query += " WHERE " + whereclause;
        }
        query += ")";
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<Manager[]> {
        let managers: Manager[] = [];
        try {
            const result = await App.app.dbmanager.execute(Manager.selectQuery(whereclause));
            managers = Manager.listFromDBObjectList(result.recordset);
            return managers;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}

export interface ManagerObj {
    Id: number;
    Name: string;
    Rank: string;
    Position: string;
}

export interface ManagerDBObj {
    "Managers.Id": number;
    "Managers.Name": string;
    "Managers.Rank": string;
    "Managers.Position": string;
}