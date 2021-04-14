import {Entity, PrimaryColumn, Column, Like } from "typeorm";

import { App } from "../App";

@Entity({name: "Groups"})
export class Group {
    @PrimaryColumn()
    Id: number;
    @Column()
    Name: string;
    @Column()
    LastRegistryCode: number;
    @Column()
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

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "LastRegistryCode", "SerialNumber"];
    }

    static async listSelectFromDB(search: string): Promise<Group[]> {
        let groups: Group[] = [];
        try {
            if (search === "") {
                groups = await App.app.dbmanager.groupRepo.find();
            } else {
                groups = await App.app.dbmanager.groupRepo.find({
                    where: [
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            Name: Like(`%${search}%`)
                        },
                        {
                            LastRegistryCode: Like(`%${search}%`)
                        },
                        {
                            SerialNumber: Like(`%${search}%`)
                        }
                    ]
                });
            }
            return groups;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(group: Group): Promise<Group> {
        try {
            const result = await App.app.dbmanager.groupRepo.createQueryBuilder().select("MAX(Group.Id)", "max").getRawOne();
            const maxId = result.max;
            group.Id = 1 + maxId;
            await App.app.dbmanager.groupRepo.insert(group);
            return group;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.groupRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(group: Group): Promise<Group> {
        try {
            await App.app.dbmanager.groupRepo.update(group.Id, group);
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