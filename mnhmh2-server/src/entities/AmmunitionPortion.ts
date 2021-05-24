import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { App } from "../App";
import { AmmunitionStore } from "./AmmunitionStore";
import { MaterialTab } from "./MaterialTab";

@Entity({name: "AmmunitionPortions"})
export class AmmunitionPortion {
    @PrimaryColumn()
    Id: number;
    @Column()
    Name: string;
    @Column()
    Quantity: number;

    @ManyToOne(() => MaterialTab)
    @JoinColumn({name: "MaterialTab"})
    MaterialTab: MaterialTab;

    @ManyToOne(() => AmmunitionStore)
    @JoinColumn({name: "AmmunitionStore"})
    AmmunitionStore: AmmunitionStore;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(portion: AmmunitionPortion[]): string {
        return JSON.stringify(portion);
    }

    static fromObject(obj: any): AmmunitionPortion {
        if (obj === null) {
            return null;
        }
        const portion = new AmmunitionPortion();
        portion.Id = obj.Id;
        portion.Name = obj.Name;
        portion.Quantity = obj.Quantity;

        if (obj.MaterialTab !== undefined) {
            portion.MaterialTab = obj.MaterialTab;
        }

        if (obj.AmmunitionStore !== undefined) {
            portion.AmmunitionStore = AmmunitionStore.fromObject(obj.AmmunitionStore);
        }
        return portion;
    }

    static listFromObjectList(objlist: any[]): AmmunitionPortion[] {
        const portions: AmmunitionPortion[] = [];
        for (const obj of objlist) {
            portions.push(AmmunitionPortion.fromObject(obj));
        }
        return portions;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "Quantity"];
    }
    static selectStringList: string[] = ["AmmunitionPortion.Id", "AmmunitionPortion.Name", "AmmunitionPortion.Quantity"];
    static searchQueryString(search: string): string {
        return `AmmunitionPortion.Id LIKE '%${search}%' OR AmmunitionPortion.Name LIKE '%${search}%' OR AmmunitionPortion.Quantity LIKE '%${search}%'`;
    }

    static async listSelectFromDB(Id: number, notId: number, search: string, withAmmunitionStore: boolean, withMaterialTab: boolean, ammunitionStoreId: number, notAmmunitionStoreId: number, materialTabId: number, notMaterialTabId: number): Promise<AmmunitionPortion[]> {
        try {
            const portions_query = App.app.dbmanager.ammunitionPortionRepo.createQueryBuilder("AmmunitionPortion")
                .leftJoinAndSelect("AmmunitionPortion.AmmunitionStore", "AmmunitionStore")
                .leftJoinAndSelect("AmmunitionPortion.MaterialTab", "MaterialTab");

            if (Id !== null) {
                portions_query.andWhere(`AmmunitionPortion.Id = '${Id}'`);
            }
            if (notId !== null) {
                portions_query.andWhere(`AmmunitionPortion.Id != '${notId}'`);
            }
            if (search !== null) {
                let searchstring = AmmunitionPortion.searchQueryString(search);
                if (withAmmunitionStore) {
                    searchstring += ` OR ${AmmunitionStore.searchQueryString(search)}`;
                }
                if (withMaterialTab) {
                    searchstring += ` OR ${MaterialTab.searchQueryString(search)}`;
                }
                portions_query.andWhere(`(${searchstring})`);
            }
            if (ammunitionStoreId !== null) {
                portions_query.andWhere(`AmmunitionStore.Id = '${ammunitionStoreId}'`);
            }
            if (notAmmunitionStoreId !== null) {
                portions_query.andWhere(`(AmmunitionStore IS NULL OR AmmunitionStore.Id != '${notAmmunitionStoreId}')`);
            }
            portions_query.select(AmmunitionPortion.selectStringList);
            if (withAmmunitionStore) {
                portions_query.addSelect(AmmunitionStore.selectStringList);
            }
            if (withMaterialTab) {
                portions_query.addSelect(MaterialTab.selectStringList);
            }
            const portions: AmmunitionPortion[] = await portions_query.getMany();
            return portions;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(portions: AmmunitionPortion): Promise<AmmunitionPortion> {
        try {
            const result = await App.app.dbmanager.ammunitionPortionRepo.createQueryBuilder().select("MAX(AmmunitionPortion.Id)", "max").getRawOne();
            const maxId = result.max;
            portions.Id = 1 + maxId;
            await App.app.dbmanager.ammunitionPortionRepo.insert(portions);
            return portions;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.ammunitionPortionRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(portions: AmmunitionPortion): Promise<AmmunitionPortion> {
        try {
            await App.app.dbmanager.ammunitionPortionRepo.update(portions.Id, portions);
            return portions;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}