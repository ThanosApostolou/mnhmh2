import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { App } from "../App";
import { MaterialTab } from "./MaterialTab";
import { Subcategory } from "./Subcategory";

@Entity({name: "SubcategoryContents"})
export class SubcategoryContent {
    @PrimaryColumn()
    Id: number;
    @Column()
    Name: string;
    @Column()
    Quantity: number;

    @ManyToOne(() => Subcategory)
    @JoinColumn({name: "SubcategoryBelongingTo"})
    SubcategoryBelongingTo: Subcategory;

    @ManyToOne(() => MaterialTab)
    @JoinColumn({name: "SubcategoryContentTab"})
    SubcategoryContentTab: MaterialTab;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(subcategoryContents: SubcategoryContent[]): string {
        return JSON.stringify(subcategoryContents);
    }

    static fromObject(obj: any): SubcategoryContent {
        if (obj === null) {
            return null;
        }
        const subcategoryContent = new SubcategoryContent();
        subcategoryContent.Id = obj.Id;
        subcategoryContent.Name = obj.Name;

        if (obj.SubcategoryBelongingTo !== undefined) {
            subcategoryContent.SubcategoryBelongingTo = Subcategory.fromObject(obj.SubcategoryBelongingTo);
        }
        if (obj.SubcategoryContentTab !== undefined) {
            subcategoryContent.SubcategoryContentTab = MaterialTab.fromObject(obj.SubcategoryContentTab);
        }
        return subcategoryContent;
    }

    static listFromObjectList(objlist: any[]): SubcategoryContent[] {
        const subcategoryContents: SubcategoryContent[] = [];
        for (const obj of objlist) {
            subcategoryContents.push(SubcategoryContent.fromObject(obj));
        }
        return subcategoryContents;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "Quantity"];
    }
    static selectStringList: string[] = ["SubcategoryContent.Id", "SubcategoryContent.Name", "SubcategoryContent.Quantity"];
    static searchQueryString(search: string): string {
        return `SubcategoryContent.Id LIKE '%${search}%' OR SubcategoryContent.Name LIKE '%${search}%' OR SubcategoryContent.Quantity LIKE '%${search}%'`;
    }

    static async listSelectFromDB(Id: number, notId: number, search: string, withSubcategoryBelongingTo: boolean, withSubcategoryContentTab: boolean, subcategoryBelongingToId: number, notSubcategoryBelongingToId: number, subcategoryContentTabId: number, notSubcategoryContentTabId: number): Promise<SubcategoryContent[]> {
        try {
            const subcategoryContents_query = App.app.dbmanager.subcategoryContentRepo.createQueryBuilder("SubcategoryContent")
                .leftJoinAndSelect("SubcategoryContent.SubcategoryBelongingTo", "Subcategory")
                .leftJoinAndSelect("SubcategoryContent.SubcategoryContentTab", "MaterialTab");

            if (Id !== null) {
                subcategoryContents_query.andWhere(`SubcategoryContent.Id = '${Id}'`);
            }
            if (notId !== null) {
                subcategoryContents_query.andWhere(`SubcategoryContent.Id != '${notId}'`);
            }
            if (search !== null) {
                let searchstring = SubcategoryContent.searchQueryString(search);
                if (withSubcategoryBelongingTo) {
                    searchstring += ` OR ${Subcategory.searchQueryString(search)}`;
                }
                if (withSubcategoryContentTab) {
                    searchstring += ` OR ${MaterialTab.searchQueryString(search)}`;
                }
                subcategoryContents_query.andWhere(`(${searchstring})`);
            }
            if (subcategoryBelongingToId !== null) {
                subcategoryContents_query.andWhere(`Subcategory.Id = '${subcategoryBelongingToId}'`);
            }
            if (notSubcategoryBelongingToId !== null) {
                subcategoryContents_query.andWhere(`(Subcategory.Id IS NULL OR Subcategory.Id != '${notSubcategoryBelongingToId}')`);
            }
            if (subcategoryContentTabId !== null) {
                subcategoryContents_query.andWhere(`MaterialTab.Id = '${subcategoryContentTabId}'`);
            }
            if (notSubcategoryContentTabId !== null) {
                subcategoryContents_query.andWhere(`(MaterialTab.Id IS NULL OR MaterialTab.Id != '${notSubcategoryContentTabId}')`);
            }
            subcategoryContents_query.select(SubcategoryContent.selectStringList);
            if (withSubcategoryBelongingTo) {
                subcategoryContents_query.addSelect(Subcategory.selectStringList);
            }
            if (withSubcategoryContentTab) {
                subcategoryContents_query.addSelect(MaterialTab.selectStringList);
            }
            const subcategories: SubcategoryContent[] = await subcategoryContents_query.getMany();
            return subcategories;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async insertToDB(subcategoryContent: SubcategoryContent): Promise<SubcategoryContent> {
        try {
            const result = await App.app.dbmanager.subcategoryContentRepo.createQueryBuilder().select("MAX(Subcategory.Id)", "max").getRawOne();
            const maxId = result.max;
            subcategoryContent.Id = 1 + maxId;
            await App.app.dbmanager.subcategoryContentRepo.insert(subcategoryContent);
            return subcategoryContent;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.subcategoryContentRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(subcategoryContent: SubcategoryContent): Promise<SubcategoryContent> {
        try {
            await App.app.dbmanager.subcategoryContentRepo.update(subcategoryContent.Id, subcategoryContent);
            return subcategoryContent;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}