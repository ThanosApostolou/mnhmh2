import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { App } from "../App";
import { Category, CategoryObj } from "./Category";
import { Group, GroupObj } from "./Group";

@Entity({name: "MaterialTabs"})
export class MaterialTab {
    @PrimaryColumn()
    Id: number;
    @Column()
    PartialRegistryCode: string;
    @Column()
    PartialRegistryCodeNumber: number;
    @Column()
    AOEF: string;
    @Column()
    Name: string;
    @Column()
    MeasurementUnit: string;
    @Column()
    TabRemainder: number;
    @Column()
    Sum: number;
    @Column()
    Difference: number;
    @Column()
    Comments: string;
    @Column()
    ImportSum: number;
    @Column()
    ExportSum: number;
    @Column()
    Found: number;
    //@Column()
    //PendingCrediting: number;
    //@Column()
    //Surplus: number;
    //@Column()
    //Deficit: number;
    //@Column()
    //Image: string;
    @Column()
    GeneralRegistryCode: number;
    //@Column()
    //Archived: number;
    @Column()
    SerialNumber: number;
    @Column()
    MaterialWithoutTab: boolean;
    @Column()
    CurrentMaterialTab: boolean;
    //@Column()
    //GEEFCode: string;

    @ManyToOne(() => Group)
    @JoinColumn({name: "Group"})
    Group: Group;

    @ManyToOne(() => Category, { eager: true})
    @JoinColumn({name: "Category"})
    Category: Category;

    //@Column()
    //ComparativesPrintPage_MaterialTabs: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(materialtabs: MaterialTab[]): string {
        return JSON.stringify(materialtabs);
    }

    static fromObject(obj: MaterialTabObj): MaterialTab {
        if (obj === null) {
            return null;
        }
        const materialtab = new MaterialTab();
        materialtab.Id = obj.Id;
        materialtab.PartialRegistryCode = obj.PartialRegistryCode;
        materialtab.PartialRegistryCodeNumber = obj.PartialRegistryCodeNumber;
        materialtab.AOEF = obj.AOEF;
        materialtab.Name = obj.Name;
        materialtab.MeasurementUnit = obj.MeasurementUnit;
        materialtab.TabRemainder = obj.TabRemainder;
        materialtab.Sum = obj.Sum;
        materialtab.Difference = obj.Difference;
        materialtab.Comments = obj.Comments;
        materialtab.ImportSum = obj.ImportSum;
        materialtab.ExportSum = obj.ExportSum;
        materialtab.Found = obj.Found;
        //materialtab.PendingCrediting = obj.PendingCrediting;
        //materialtab.Surplus = obj.Surplus;
        //materialtab.Deficit = obj.Deficit;
        //materialtab.Image = obj.Image;
        materialtab.GeneralRegistryCode = obj.GeneralRegistryCode;
        //materialtab.Archived = obj.Archived;
        materialtab.SerialNumber = obj.SerialNumber;
        materialtab.MaterialWithoutTab = obj.MaterialWithoutTab;
        materialtab.CurrentMaterialTab = obj.CurrentMaterialTab;
        //materialtab.GEEFCode = obj.GEEFCode;

        if (obj.Group !== undefined) {
            materialtab.Group = Group.fromObject(obj.Group);
        }
        if (obj.Category !== undefined) {
            materialtab.Category = Category.fromObject(obj.Category);
        }
        //materialtab.ComparativesPrintPage_MaterialTabs = obj.ComparativesPrintPage_MaterialTabs;
        return materialtab;
    }

    static listFromObjectList(objlist: MaterialTabObj[]): MaterialTab[] {
        const materialtabs: MaterialTab[] = [];
        for (const obj of objlist) {
            materialtabs.push(MaterialTab.fromObject(obj));
        }
        return materialtabs;
    }

    static selectStringList: string[] = ["MaterialTab.Id", "MaterialTab.PartialRegistryCode",
        "MaterialTab.PartialRegistryCodeNumber", "MaterialTab.AOEF", "MaterialTab.Name",
        "MaterialTab.MeasurementUnit", "MaterialTab.TabRemainder", "MaterialTab.Sum",
        "MaterialTab.Difference", "MaterialTab.Comments", "MaterialTab.ImportSum",
        "MaterialTab.ExportSum", "MaterialTab.Found", "MaterialTab.GeneralRegistryCode",
        "MaterialTab.Archived", "MaterialTab.SerialNumber", "MaterialTab.MaterialWithoutTab",
        "MaterialTab.CurrentMaterialTab"];
    // , "MaterialTab.PendingCrediting", "MaterialTab.Surplus", "MaterialTab.Deficit", "MaterialTab.GEEFCode"
    static searchQueryString(search: string): string {
        return `MaterialTab.Id LIKE '%${search}%' OR MaterialTab.PartialRegistryCode LIKE '%${search}%'
        OR MaterialTab.PartialRegistryCodeNumber LIKE '%${search}%' OR MaterialTab.AOEF LIKE '%${search}%'
        OR MaterialTab.Name LIKE '%${search}%' OR MaterialTab.MeasurementUnit LIKE '%${search}%'
        OR MaterialTab.TabRemainder LIKE '%${search}%' OR MaterialTab.Sum LIKE '%${search}%'
        OR MaterialTab.Difference LIKE '%${search}%' OR MaterialTab.Comments LIKE '%${search}%'
        OR MaterialTab.ImportSum LIKE '%${search}%' OR MaterialTab.ExportSum LIKE '%${search}%'
        OR MaterialTab.GeneralRegistryCode LIKE '%${search}%'
        OR MaterialTab.SerialNumber LIKE '%${search}%'`;
        // OR MaterialTab.PendingCrediting LIKE '%${search}%' OR MaterialTab.Surplus LIKE '%${search}%' OR MaterialTab.Deficit LIKE '%${search}%' OR MaterialTab.GEEFCode LIKE '%${search}%'
    }

    static async listSelectFromDB(Id: number, notId: number, search: string, withGroup: boolean, withCategory: boolean, groupId: number, notGroupId: number, categoryId: number, notCategoryId: number): Promise<MaterialTab[]> {
        try {
            const materialtabs_query = App.app.dbmanager.materialTabRepo.createQueryBuilder("MaterialTab")
                .leftJoinAndSelect("MaterialTab.Group", "Group")
                .leftJoinAndSelect("MaterialTab.Category", "Category");

            if (Id !== null) {
                materialtabs_query.andWhere(`MaterialTab.Id = '${Id}'`);
            }
            if (notId !== null) {
                materialtabs_query.andWhere(`MaterialTab.Id != '${notId}'`);
            }
            if (search !== null) {
                let searchstring = MaterialTab.searchQueryString(search);
                if (withGroup) {
                    searchstring += ` OR ${Group.searchQueryString(search)}`;
                }
                if (withCategory) {
                    searchstring += ` OR ${Category.searchQueryString(search)}`;
                }
                materialtabs_query.andWhere(`(${searchstring})`);
            }
            if (groupId !== null) {
                materialtabs_query.andWhere(`Group.Id = '${groupId}'`);
            }
            if (notGroupId !== null) {
                materialtabs_query.andWhere(`(Group.Id IS NULL OR Group.Id != '${notGroupId}')`);
            }
            if (categoryId !== null) {
                materialtabs_query.andWhere(`Category.Id = '${categoryId}'`);
            }
            if (notCategoryId !== null) {
                materialtabs_query.andWhere(`(Category.Id IS NULL OR Category.Id != '${notCategoryId}')`);
            }
            materialtabs_query.select(MaterialTab.selectStringList);
            if (withGroup) {
                materialtabs_query.addSelect(Group.selectStringList);
            }
            if (withCategory) {
                materialtabs_query.addSelect(Category.selectStringList);
            }
            const materialtabs: MaterialTab[] = await materialtabs_query.getMany();
            return materialtabs;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async insertToDB(mtb: MaterialTab): Promise<MaterialTab> {
        try {
            const result = await App.app.dbmanager.materialTabRepo.createQueryBuilder().select("MAX(MaterialTab.Id)", "max").getRawOne();
            const maxId = result.max;
            mtb.Id = 1 + maxId;
            const materialTabsWithGroupQueryBuilder = App.app.dbmanager.materialTabRepo.createQueryBuilder().leftJoinAndSelect("MaterialTab.Group", "Group").where(`Group.Id = '${mtb.Group.Id}'`);
            const groups = await Group.listSelectFromDB(mtb.Group.Id, null, null);
            if (groups.length > 0) {
                const group = groups[0];
                group.LastRegistryCode += 1;
                mtb.PartialRegistryCodeNumber = group.LastRegistryCode;
                await Group.updateInDB(group);
            } else {
                mtb.PartialRegistryCodeNumber = 1;
            }
            const result3 = await App.app.dbmanager.materialTabRepo.createQueryBuilder().select("MAX(MaterialTab.SerialNumber)", "max").getRawOne();
            const maxSerialNumber = result3.max;
            mtb.SerialNumber = 1 + maxSerialNumber;

            mtb.TabRemainder = 0;
            mtb.Sum = 0;
            mtb.Difference = 0;
            mtb.ImportSum = 0;
            mtb.ExportSum = 0;
            mtb.Found = 0;

            mtb.MaterialWithoutTab = Boolean(mtb.MaterialWithoutTab);
            mtb.CurrentMaterialTab = Boolean(mtb.CurrentMaterialTab);

            if (!mtb.MaterialWithoutTab) {
                const materialTabsWithGroup = await materialTabsWithGroupQueryBuilder.andWhere("MaterialTab.MaterialWithoutTab = 'false'").select(MaterialTab.selectStringList).getMany();
                let max = 0;
                for (const materialTab of materialTabsWithGroup) {
                    console.log("PartialRegistryCode", materialTab.PartialRegistryCode);
                    const ef24Splited = materialTab.PartialRegistryCode.split("-");
                    let ef24Number = 0;
                    try {
                        ef24Number = parseInt(ef24Splited[1]);
                    } finally {
                        if (ef24Number > max) {
                            max = ef24Number;
                        }
                    }
                }
                mtb.PartialRegistryCode = `${mtb.Group.Name}-${1+max}`;
            }

            await App.app.dbmanager.materialTabRepo.insert(mtb);
            return mtb;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.materialTabRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(mtb: MaterialTab): Promise<MaterialTab> {
        try {
            await App.app.dbmanager.materialTabRepo.update(mtb.Id, mtb);
            return mtb;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

}

export interface MaterialTabObj {
    Id: number;
    PartialRegistryCode: string;
    PartialRegistryCodeNumber: number;
    AOEF: string;
    Name: string;
    MeasurementUnit: string;
    TabRemainder: number;
    Sum: number;
    Difference: number;
    Comments: string;
    ImportSum: number;
    ExportSum: number;
    Found: number;
    //PendingCrediting: number;
    //Surplus: number;
    //Deficit: number;
    //Image: string;
    GeneralRegistryCode: number;
    //Archived: number;
    SerialNumber: number;
    MaterialWithoutTab: boolean;
    CurrentMaterialTab: boolean;
    //GEEFCode: string;
    Group: GroupObj;
    Category: CategoryObj;
    //ComparativesPrintPage_MaterialTabs: number;
}
