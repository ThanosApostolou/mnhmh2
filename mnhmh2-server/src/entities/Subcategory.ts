import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Like } from "typeorm";

import { App } from "../App";
import { Borrower } from "./Borrower";
import { MaterialTab } from "./MaterialTab";

@Entity({name: "Subcategories"})
export class Subcategory {
    @PrimaryColumn()
    Id: number;
    @Column()
    Name: string;

    @ManyToOne(() => MaterialTab)
    @JoinColumn({name: "MaterialTab"})
    MaterialTab: MaterialTab;

    @ManyToOne(() => Borrower)
    @JoinColumn({name: "Borrower"})
    Borrower: Borrower;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(subcategory: Subcategory[]): string {
        return JSON.stringify(subcategory);
    }

    static fromObject(obj: any): Subcategory {
        const subcategory = new Subcategory();
        subcategory.Id = obj.Id;
        subcategory.Name = obj.Name;
        subcategory.MaterialTab = obj.MaterialTab;
        subcategory.Borrower = obj.Borrower;
        return subcategory;
    }

    static listFromObjectList(objlist: any[]): Subcategory[] {
        const subcategories: Subcategory[] = [];
        for (const obj of objlist) {
            subcategories.push(Subcategory.fromObject(obj));
        }
        return subcategories;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name"];
    }

    static async listSelectFromDB(search: string): Promise<Subcategory[]> {
        let subcategories: Subcategory[] = [];
        try {
            if (search === "") {
                subcategories = await App.app.dbmanager.subcategoryRepo.find({
                    relations: ["MaterialTab", "Borrower"]
                });
            } else {
                subcategories = await App.app.dbmanager.subcategoryRepo.createQueryBuilder("Subcategory")
                    .leftJoinAndSelect("Subcategory.MaterialTab", "MaterialTab")
                    .leftJoinAndSelect("Subcategory.Borrower", "Borrower")
                    .where([
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            Name: Like(`%${search}%`)
                        },
                    ])
                    .orWhere(`MaterialTab.PartialRegistryCode LIKE '%${search}%' OR MaterialTab.Name LIKE '%${search}%'`)
                    .orWhere(`Borrower.Name LIKE '%${search}%' OR Borrower.SerialNumber LIKE '%${search}%'`)
                    .getMany();
            }
            return subcategories;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(subcategories: Subcategory): Promise<Subcategory> {
        try {
            const result = await App.app.dbmanager.subcategoryRepo.createQueryBuilder().select("MAX(Subcategory.Id)", "max").getRawOne();
            const maxId = result.max;
            subcategories.Id = 1 + maxId;
            await App.app.dbmanager.subcategoryRepo.insert(subcategories);
            return subcategories;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.subcategoryRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(subcategories: Subcategory): Promise<Subcategory> {
        try {
            await App.app.dbmanager.subcategoryRepo.update(subcategories.Id, subcategories);
            return subcategories;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}