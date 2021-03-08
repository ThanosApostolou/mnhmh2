import { App } from "../App";

export class Manager {
    Id: number;
    VersionTimestamp: string;
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
        manager.VersionTimestamp = obj.VersionTimestamp;
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

    static async listSelectFromDB(): Promise<Manager[]> {
        let managers: Manager[] = [];
        try {
            const result = await App.app.dbmanager.execute("SELECT * FROM Managers");
            managers = Manager.listFromObjectList(result.recordset);
            return managers;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}