import { App } from "../App";
import { DBManager } from "../DBManager";

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

    static fromDBObject(dbobj: any, prefix: string): Manager {
        const manager: Manager = new Manager();
        manager.Id = dbobj[prefix+"Id"];
        manager.Name = dbobj[prefix+"Name"];
        manager.Rank = dbobj[prefix+"Rank"];
        manager.Position = dbobj[prefix+"Position"];
        return manager;
    }

    static listFromDBObjectList(objlist: any[], prefix: string): Manager[] {
        const managers: Manager[] = [];
        for (const obj of objlist) {
            managers.push(Manager.fromDBObject(obj, prefix));
        }
        return managers;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "Rank", "Position"];
    }

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(Manager._getOwnFieldsList(), prefix)}
            FROM Managers
            ${wherestring})
        `;
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<Manager[]> {
        let managers: Manager[] = [];
        try {
            const result = await App.app.dbmanager.execute(Manager.selectQuery(whereclause, ""));
            const recordset: ManagerObj[] = result.recordset;
            managers = Manager.listFromDBObjectList(recordset, "");
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