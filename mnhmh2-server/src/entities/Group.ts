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
    static selectStringList: string[] = ["Group.Id", "Group.Name", "Group.LastRegistryCode", "Group.SerialNumber"];
    static searchQueryString(search: string): string {
        return `Group.Id LIKE '%${search}%' OR Group.Name LIKE '%${search}%' OR Group.LastRegistryCode LIKE '%${search}%' OR Group.SerialNumber LIKE '%${search}%'`;
    }

    static async listSelectFromDB(Id: number, notId: number, search: string): Promise<Group[]> {
        try {
            const groups_query = App.app.dbmanager.groupRepo.createQueryBuilder("Group");
            if (Id !== null) {
                groups_query.andWhere(`Group.Id = '${Id}'`);
            }
            if (notId !== null) {
                groups_query.andWhere(`Group.Id != '${notId}'`);
            }
            if (search != null) {
                groups_query.andWhere(`(${Group.searchQueryString(search)})`);

            }
            const groups: Group[] = await groups_query.getMany();
            return groups;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async insertToDB(group: Group): Promise<Group> {
        try {
            const result = await App.app.dbmanager.groupRepo.createQueryBuilder("Group").select("MAX(Group.Id)", "maxId").addSelect("Max(Group.SerialNumber)", "maxSerialNumber").getRawOne();
            console.log("RESULT", result);
            const maxId = result["maxId"];
            group.Id = 1 + maxId;
            const maxSerialNumber = result["maxSerialNumber"];
            group.SerialNumber = 1 + maxSerialNumber;
            group.LastRegistryCode = 0;
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
            delete group.SerialNumber;
            delete group.LastRegistryCode;
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