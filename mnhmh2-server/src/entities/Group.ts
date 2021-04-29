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
        if (obj === null) {
            return null;
        }
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

    static async listSelectFromDB(Id: number, notId: number, search: string): Promise<Group[]> {
        //*const groups: Group[] = [];
        try {
            /*if (search === null) {
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
            }*/
            const groups_query = App.app.dbmanager.groupRepo.createQueryBuilder("Group");
            if (Id !== null) {
                groups_query.andWhere(`Group.Id = '${Id}'`);
            }
            if (notId !== null) {
                groups_query.andWhere(`Group.Id != '${notId}'`);
            }
            if (search != null) {
                groups_query.andWhere(`(Group.Id LIKE '%${search}%' OR Group.Name LIKE '%${search}%' OR Group.LastRegistryCode LIKE '%${search}%' OR Group.SerialNumber LIKE '%${search}%')`);

            }
            const groups: Group[] = await groups_query.getMany();
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