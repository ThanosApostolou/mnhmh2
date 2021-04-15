import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Like } from "typeorm";

import { App } from "../App";
import { DBManager } from "../DBManager";
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
    @Column()
    PendingCrediting: number;
    @Column()
    Surplus: number;
    @Column()
    Deficit: number;
    @Column()
    Image: string;
    @Column()
    GeneralRegistryCode: number;
    @Column()
    Archived: boolean;
    @Column()
    SerialNumber: number;
    @Column()
    MaterialWithoutTab: boolean;
    @Column()
    CurrentMaterialTab: boolean;
    @Column()
    GEEFCode: string;

    @ManyToOne(() => Group)
    @JoinColumn({name: "Group"})
    Group: Group;

    @ManyToOne(() => Category)
    @JoinColumn({name: "Category"})
    Category: Category;

    @Column()
    ComparativesPrintPage_MaterialTabs: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(materialtabs: MaterialTab[]): string {
        return JSON.stringify(materialtabs);
    }

    static fromObject(obj: MaterialTabObj): MaterialTab {
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
        materialtab.PendingCrediting = obj.PendingCrediting;
        materialtab.Surplus = obj.Surplus;
        materialtab.Deficit = obj.Deficit;
        materialtab.Image = obj.Image;
        materialtab.GeneralRegistryCode = obj.GeneralRegistryCode;
        materialtab.Archived = obj.Archived;
        materialtab.SerialNumber = obj.SerialNumber;
        materialtab.MaterialWithoutTab = obj.MaterialWithoutTab;
        materialtab.CurrentMaterialTab = obj.CurrentMaterialTab;
        materialtab.GEEFCode = obj.GEEFCode;
        materialtab.Group = Group.fromObject(obj.Group);
        materialtab.Category = Category.fromObject(obj.Category);
        materialtab.ComparativesPrintPage_MaterialTabs = obj.ComparativesPrintPage_MaterialTabs;
        return materialtab;
    }

    static listFromObjectList(objlist: MaterialTabObj[]): MaterialTab[] {
        const materialtabs: MaterialTab[] = [];
        for (const obj of objlist) {
            materialtabs.push(MaterialTab.fromObject(obj));
        }
        return materialtabs;
    }

    static async listSelectFromDB(search: string): Promise<MaterialTab[]> {
        let mtbs: MaterialTab[] = [];
        try {
            if (search === "") {
                mtbs = await App.app.dbmanager.materialTabRepo.find({
                    relations: ["Group", "Category"]
                });
            } else {
                mtbs = await App.app.dbmanager.materialTabRepo.createQueryBuilder("MaterialTab")
                    .leftJoinAndSelect("MaterialTab.Group", "Group")
                    .leftJoinAndSelect("MaterialTab.Category", "Category")
                    .where([
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            PartialRegistryCode: Like(`%${search}%`)
                        },
                        {
                            PartialRegistryCodeNumber: Like(`%${search}%`)
                        },
                        {
                            AOEF: Like(`%${search}%`)
                        },
                        {
                            Name: Like(`%${search}%`)
                        },
                        {
                            AOEF: Like(`%${search}%`)
                        },
                        {
                            MeasurementUnit: Like(`%${search}%`)
                        },
                        {
                            TabRemainder: Like(`%${search}%`)
                        },
                        {
                            Sum: Like(`%${search}%`)
                        },
                        {
                            Difference: Like(`%${search}%`)
                        },
                        {
                            Comments: Like(`%${search}%`)
                        },
                        {
                            ImportSum: Like(`%${search}%`)
                        },
                        {
                            ExportSum: Like(`%${search}%`)
                        },
                        {
                            PendingCrediting: Like(`%${search}%`)
                        },
                        {
                            Surplus: Like(`%${search}%`)
                        },
                        {
                            Deficit: Like(`%${search}%`)
                        },
                        {
                            GeneralRegistryCode: Like(`%${search}%`)
                        },
                        {
                            SerialNumber: Like(`%${search}%`)
                        },
                        {
                            GEEFCode: Like(`%${search}%`)
                        },
                    ])
                    .orWhere(`Group.Name LIKE '%${search}%' OR Group.LastRegistryCode LIKE '%${search}%' OR Group.SerialNumber LIKE '%${search}%'`)
                    .orWhere(`Category.Name LIKE '%${search}%' OR Category.SerialNumber LIKE '%${search}%'`)
                    .getMany();
            }
            return mtbs;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(mtb: MaterialTab): Promise<MaterialTab> {
        try {
            const result = await App.app.dbmanager.materialTabRepo.createQueryBuilder().select("MAX(MaterialTab.Id)", "max").getRawOne();
            const maxId = result.max;
            mtb.Id = 1 + maxId;
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
    PendingCrediting: number;
    Surplus: number;
    Deficit: number;
    Image: string;
    GeneralRegistryCode: number;
    Archived: boolean;
    SerialNumber: number;
    MaterialWithoutTab: boolean;
    CurrentMaterialTab: boolean;
    GEEFCode: string;
    Group: GroupObj;
    Category: CategoryObj;
    ComparativesPrintPage_MaterialTabs: number;
}
