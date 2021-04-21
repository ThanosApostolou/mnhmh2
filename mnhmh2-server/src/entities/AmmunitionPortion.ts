import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Like } from "typeorm";

import { App } from "../App";
import { DBManager } from "../DBManager";
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
        const portion = new AmmunitionPortion();
        portion.Id = obj.Id;
        portion.Name = obj.Name;
        portion.Quantity = obj.Quantity;
        portion.MaterialTab = obj.MaterialTab;
        portion.AmmunitionStore = obj.AmmunitionStore;
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

    static async listSelectFromDB(search: string): Promise<AmmunitionPortion[]> {
        let portions: AmmunitionPortion[] = [];
        try {
            if (search === "") {
                portions = await App.app.dbmanager.ammunitionPortionRepo.find({
                    relations: ["MaterialTab", "AmmunitionStore"]
                });
            } else {
                portions = await App.app.dbmanager.ammunitionPortionRepo.createQueryBuilder("AmmunitionPortion")
                    .leftJoinAndSelect("AmmunitionPortion.MaterialTab", "MaterialTab")
                    .leftJoinAndSelect("AmmunitionPortion.AmmunitionStore", "AmmunitionStore")
                    .where([
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            Name: Like(`%${search}%`)
                        },
                        {
                            Quantity: Like(`%${search}%`)
                        },
                    ])
                    .orWhere(`MaterialTab.PartialRegistryCode LIKE '%${search}%' OR MaterialTab.Name LIKE '%${search}%'`)
                    .orWhere(`AmmunitionStore.Name LIKE '%${search}%' OR AmmunitionStore.SerialNumber LIKE '%${search}%'`)
                    .getMany();
            }
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