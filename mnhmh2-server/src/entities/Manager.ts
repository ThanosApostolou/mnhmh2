import { App } from "../App";
import { DBManager } from "../DBManager";
import {Entity, PrimaryColumn, Column, Like, OneToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { Borrower } from "./Borrower";

@Entity({name: "Managers"})
export class Manager {
    @PrimaryColumn()
    Id: number;

    @Column()
    Name: string;

    @Column()
    Rank: string;

    @Column()
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

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "Rank", "Position"];
    }

    static async listSelectFromDB(search: string): Promise<Manager[]> {
        let managers: Manager[] = [];
        try {
            if (search === "") {
                managers = await App.app.dbmanager.managerRepo.find();
            } else {
                managers = await App.app.dbmanager.managerRepo.find({
                    where: [
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            Name: Like(`%${search}%`)
                        },
                        {
                            Rank: Like(`%${search}%`)
                        },
                        {
                            Position: Like(`%${search}%`)
                        }
                    ]
                });
            }
            return managers;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async insertToDB(manager: Manager): Promise<Manager> {
        try {
            const result = await App.app.dbmanager.managerRepo.createQueryBuilder().select("MAX(Manager.Id)", "max").getRawOne();
            const maxId = result.max;
            manager.Id = 1 + maxId;
            await App.app.dbmanager.managerRepo.insert(manager);
            return manager;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.managerRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(manager: Manager): Promise<Manager> {
        try {
            await App.app.dbmanager.managerRepo.update(manager.Id, manager);
            return manager;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export interface ManagerObj {
    Id: number;
    Name: string;
    Rank: string;
    Position: string;
}