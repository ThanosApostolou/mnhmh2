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
        if (obj === null) {
            return null;
        }
        const subcategory = new Subcategory();
        subcategory.Id = obj.Id;
        subcategory.Name = obj.Name;

        if (obj.MaterialTab !== undefined) {
            subcategory.MaterialTab = MaterialTab.fromObject(obj.MaterialTab);
        }
        if (obj.Borrower !== undefined) {
            subcategory.Borrower = Borrower.fromObject(obj.Borrower);
        }
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
    static selectStringList: string[] = ["Subcategory.Id", "Subcategory.Name"];
    static searchQueryString(search: string): string {
        return `Subcategory.Id LIKE '%${search}%' OR Subcategory.Name LIKE '%${search}%'`;
    }

    static async listSelectFromDB(Id: number, notId: number, search: string, withMaterialTab: boolean, withBorrower: boolean, materialTabId: number, notMaterialTabId: number, borrowerId: number, notBorrowerId: number): Promise<Subcategory[]> {
        try {
            /*if (search === "") {
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
            */
            const subcategories_query = App.app.dbmanager.subcategoryRepo.createQueryBuilder("Subcategory")
                .leftJoinAndSelect("Subcategory.MaterialTab", "MaterialTab")
                .leftJoinAndSelect("Subcategory.Borrower", "Borrower");

            if (Id !== null) {
                subcategories_query.andWhere(`Subcategory.Id = '${Id}'`);
            }
            if (notId !== null) {
                subcategories_query.andWhere(`Subcategory.Id != '${notId}'`);
            }
            if (search !== null) {
                let searchstring = Subcategory.searchQueryString(search);
                if (withMaterialTab) {
                    searchstring += ` OR ${MaterialTab.searchQueryString(search)}`;
                }
                if (withBorrower) {
                    searchstring += ` OR ${Borrower.searchQueryString(search)}`;
                }
                subcategories_query.andWhere(`(${searchstring})`);
            }
            if (materialTabId !== null) {
                subcategories_query.andWhere(`MaterialTab.Id = '${materialTabId}'`);
            }
            if (notMaterialTabId !== null) {
                subcategories_query.andWhere(`(MaterialTab IS NULL OR MaterialTab.Id != '${notMaterialTabId}')`);
            }
            if (borrowerId !== null) {
                subcategories_query.andWhere(`Borrower.Id = '${borrowerId}'`);
            }
            if (notBorrowerId !== null) {
                subcategories_query.andWhere(`(Borrower IS NULL OR Borrower.Id != '${notBorrowerId}')`);
            }
            subcategories_query.select(Subcategory.selectStringList);
            if (withMaterialTab) {
                subcategories_query.addSelect(MaterialTab.selectStringList);
            }
            if (withBorrower) {
                subcategories_query.addSelect(Borrower.selectStringList);
            }
            const subcategories: Subcategory[] = await subcategories_query.getMany();
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