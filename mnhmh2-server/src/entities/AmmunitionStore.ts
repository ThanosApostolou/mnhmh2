import {Entity, PrimaryColumn, Column, Like, OneToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";

import { App } from "../App";

@Entity({name: "AmmunitionStores"})
export class AmmunitionStore {
    @PrimaryColumn()
    Id: number;
    @Column()
    Name: string;
    @Column()
    SerialNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(store: AmmunitionStore[]): string {
        return JSON.stringify(store);
    }

    static fromObject(obj: AmmunitionStoreObj): AmmunitionStore {
        const store = new AmmunitionStore();
        store.Id = obj.Id;
        store.Name = obj.Name;
        store.SerialNumber = obj.SerialNumber;
        return store;
    }

    static listFromObjectList(objlist: any[]): AmmunitionStore[] {
        const stores: AmmunitionStore[] = [];
        for (const obj of objlist) {
            stores.push(AmmunitionStore.fromObject(obj));
        }
        return stores;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "SerialNumber"];
    }

    static async listSelectFromDB(search: string): Promise<AmmunitionStore[]> {
        let stores: AmmunitionStore[] = [];
        try {
            if (search === "") {
                stores = await App.app.dbmanager.ammunitionStoreRepo.find();
            } else {
                stores = await App.app.dbmanager.ammunitionStoreRepo.find({
                    where: [
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            Name: Like(`%${search}%`)
                        },
                        {
                            SerialNumber: Like(`%${search}%`)
                        }
                    ]
                });
            }
            return stores;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(store: AmmunitionStore): Promise<AmmunitionStore> {
        try {
            const result = await App.app.dbmanager.ammunitionStoreRepo.createQueryBuilder().select("MAX(Group.Id)", "max").getRawOne();
            const maxId = result.max;
            store.Id = 1 + maxId;
            await App.app.dbmanager.ammunitionStoreRepo.insert(store);
            return store;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.ammunitionStoreRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(store: AmmunitionStore): Promise<AmmunitionStore> {
        try {
            await App.app.dbmanager.ammunitionStoreRepo.update(store.Id, store);
            return store;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export interface AmmunitionStoreObj {
    Id: number;
    Name: string;
    SerialNumber: number;
}