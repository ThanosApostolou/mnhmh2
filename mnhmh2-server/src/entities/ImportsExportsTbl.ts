import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Like } from "typeorm";

import { App } from "../App";
import { DBManager } from "../DBManager";
import { MaterialTab, MaterialTabObj } from "./MaterialTab";

@Entity({name: "ImportsExportsTbl"})
export class ImportsExportsTbl {
    @PrimaryColumn()
    Id: number;
    @Column()
    Date: Date;
    @Column()
    Unit: string;
    @Column()
    JustificationFileNumber: string;
    @Column()
    Imported: number;
    @Column()
    Exported: number;
    @Column()
    Remaining: number;
    @Column()
    Comments: string;

    @ManyToOne(() => MaterialTab)
    @JoinColumn({name: "MaterialTab"})
    MaterialTab: MaterialTab;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(ietbl: ImportsExportsTbl[]): string {
        return JSON.stringify(ietbl);
    }

    static fromObject(obj: ImportsExportsTblObj): ImportsExportsTbl {
        if (obj === null) {
            return null;
        }
        const ietbl = new ImportsExportsTbl();
        ietbl.Id = obj.Id;
        ietbl.Date = obj.Date;
        ietbl.Unit = obj.Unit;
        ietbl.JustificationFileNumber = obj.JustificationFileNumber;
        ietbl.Imported = obj.Imported;
        ietbl.Exported = obj.Exported;
        ietbl.Remaining = obj.Remaining;
        ietbl.Comments = obj.Comments;

        if (obj.MaterialTab !== undefined) {
            ietbl.MaterialTab = MaterialTab.fromObject(obj.MaterialTab);
        }
        return ietbl;
    }

    static listFromObjectList(objlist: any[]): ImportsExportsTbl[] {
        const importsexportstbls: ImportsExportsTbl[] = [];
        for (const obj of objlist) {
            importsexportstbls.push(ImportsExportsTbl.fromObject(obj));
        }
        return importsexportstbls;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Date", "Unit", "JustificationFileNumber", "Imported", "Exported", "Remaining", "Comments"];
    }
    static selectStringList: string[] = [
        "ImportsExportsTbl.Id", "ImportsExportsTbl.Date", "ImportsExportsTbl.Unit",
        "ImportsExportsTbl.JustificationFileNumber", "ImportsExportsTbl.Imported",
        "ImportsExportsTbl.Exported", "ImportsExportsTbl.Remaining", "ImportsExportsTbl.Comments"];
    static searchQueryString(search: string): string {
        return `ImportsExportsTbl.Id LIKE '%${search}%' OR ImportsExportsTbl.Date LIKE '%${search}%'
        OR ImportsExportsTbl.Unit LIKE '%${search}%' OR ImportsExportsTbl.JustificationFileNumber LIKE '%${search}%'
        OR ImportsExportsTbl.Imported LIKE '%${search}%' OR ImportsExportsTbl.Exported LIKE '%${search}%'
        OR ImportsExportsTbl.Remaining LIKE '%${search}%' OR ImportsExportsTbl.Comments LIKE '%${search}%'`;
    }

    static async listSelectFromDB(Id: number, notId: number, fromDate: string, toDate: string, search: string, withMaterialTab: boolean, materialTabId: number, notMaterialTabId: number): Promise<ImportsExportsTbl[]> {
        //let importsexportstbls: ImportsExportsTbl[] = [];
        try {
            /*
            if (search === "") {
                importsexportstbls = await App.app.dbmanager.importsexportstblRepo.find({
                    relations: ["MaterialTab"]
                });
            } else {
                importsexportstbls = await App.app.dbmanager.importsexportstblRepo.createQueryBuilder("ImportsExportsTbl")
                    .leftJoinAndSelect("ImportsExportsTbl.MaterialTab", "MaterialTab")
                    .leftJoinAndSelect("MaterialTab.Category", "Category")
                    .where([
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            Date: Like(`%${search}%`)
                        },
                        {
                            Unit: Like(`%${search}%`)
                        },
                        {
                            JustificationFileNumber: Like(`%${search}%`)
                        },
                        {
                            Imported: Like(`%${search}%`)
                        },
                        {
                            Exported: Like(`%${search}%`)
                        },
                        {
                            Remaining: Like(`%${search}%`)
                        },
                        {
                            Comments: Like(`%${search}%`)
                        }
                    ])
                    .orWhere(`MaterialTab.PartialRegistryCode LIKE '%${search}%' OR MaterialTab.Name LIKE '%${search}%'`)
                    .getMany();
            }
            */
            const importsexportstbls_query = App.app.dbmanager.importsexportstblRepo.createQueryBuilder("ImportsExportsTbl")
                .leftJoinAndSelect("ImportsExportsTbl.MaterialTab", "MaterialTab");

            if (Id !== null) {
                importsexportstbls_query.andWhere(`ImportsExportsTbl.Id = '${Id}'`);
            }
            if (notId !== null) {
                importsexportstbls_query.andWhere(`ImportsExportsTbl.Id != '${notId}'`);
            }
            if (fromDate !== null) {
                importsexportstbls_query.andWhere(`ImportsExportsTbl.Date >= '${fromDate}'`);
            }
            if (toDate !== null) {
                importsexportstbls_query.andWhere(`ImportsExportsTbl.Date <= '${toDate}'`);
            }
            if (search !== null) {
                let searchstring = ImportsExportsTbl.searchQueryString(search);
                if (withMaterialTab) {
                    searchstring += ` OR ${MaterialTab.searchQueryString(search)}`;
                }
                importsexportstbls_query.andWhere(`(${searchstring})`);
            }
            if (materialTabId !== null) {
                importsexportstbls_query.andWhere(`MaterialTab.Id = '${materialTabId}'`);
            }
            if (notMaterialTabId !== null) {
                importsexportstbls_query.andWhere(`(MaterialTab.Id IS NULL OR MaterialTab.Id != '${notMaterialTabId}')`);
            }
            importsexportstbls_query.select(ImportsExportsTbl.selectStringList);
            if (withMaterialTab) {
                importsexportstbls_query.addSelect(MaterialTab.selectStringList);
            }
            const importsexportstbls: ImportsExportsTbl[] = await importsexportstbls_query.getMany();
            return importsexportstbls;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async insertToDB(importsexportstbl: ImportsExportsTbl): Promise<ImportsExportsTbl> {
        try {
            const result = await App.app.dbmanager.importsexportstblRepo.createQueryBuilder().select("MAX(ImportsExportsTbl.Id)", "max").getRawOne();
            const maxId = result.max;
            importsexportstbl.Id = 1 + maxId;
            await App.app.dbmanager.importsexportstblRepo.insert(importsexportstbl);
            return importsexportstbl;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.importsexportstblRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(importsexportstbl: ImportsExportsTbl): Promise<ImportsExportsTbl> {
        try {
            await App.app.dbmanager.importsexportstblRepo.update(importsexportstbl.Id, importsexportstbl);
            return importsexportstbl;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export interface ImportsExportsTblObj {
    Id: number;
    Date: Date;
    Unit: string;
    JustificationFileNumber: string;
    Imported: number;
    Exported: number;
    Remaining: number;
    Comments: string;
    MaterialTab: MaterialTabObj;
}

export interface BorrowerDBObj {
    "Id": number;
    "Name": string;
    "SerialNumber": number;
    "Managers.Id": number;
    "Managers.Name": string;
    "Managers.Rank": string;
    "Managers.Position": string;
}