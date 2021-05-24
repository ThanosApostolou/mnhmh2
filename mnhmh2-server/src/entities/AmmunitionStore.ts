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
        if (obj === null) {
            return null;
        }
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
    static selectStringList: string[] = ["AmmunitionStore.Id", "AmmunitionStore.Name", "AmmunitionStore.SerialNumber"];
    static searchQueryString(search: string): string {
        return `AmmunitionStore.Id LIKE '%${search}%' OR AmmunitionStore.Name LIKE '%${search}%' OR AmmunitionStore.SerialNumber LIKE '%${search}%'`;
    }

    static async listSelectFromDB(Id: number, notId: number, search: string): Promise<AmmunitionStore[]> {
        try {
            const stores_query = App.app.dbmanager.ammunitionStoreRepo.createQueryBuilder("AmmunitionStore");
            if (Id !== null) {
                stores_query.andWhere(`AmmunitionStore.Id = '${Id}'`);
            }
            if (notId !== null) {
                stores_query.andWhere(`AmmunitionStore.Id != '${notId}'`);
            }
            if (search != null) {
                stores_query.andWhere(`(${AmmunitionStore.searchQueryString(search)})`);

            }
            const stores: AmmunitionStore[] = await stores_query.getMany();
            return stores;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(store: AmmunitionStore): Promise<AmmunitionStore> {
        try {
            const result = await App.app.dbmanager.ammunitionStoreRepo.createQueryBuilder().select("MAX(AmmunitionStore.Id)", "max").getRawOne();
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