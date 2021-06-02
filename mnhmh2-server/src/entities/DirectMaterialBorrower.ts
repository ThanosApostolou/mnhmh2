import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Like } from "typeorm";
import { App } from "../App";
import { DBManager } from "../DBManager";
import { Borrower, BorrowerObj } from "./Borrower";
import { MaterialTab, MaterialTabObj } from "./MaterialTab";

@Entity({name: "DirectMaterialBorrowers"})
export class DirectMaterialBorrower {
    @PrimaryColumn()
    Id: number;
    @Column()
    Quantity: number;

    @ManyToOne(() => Borrower)
    @JoinColumn({name: "Borrower"})
    Borrower: Borrower;

    @ManyToOne(() => MaterialTab)
    @JoinColumn({name: "MaterialTab"})
    MaterialTab: MaterialTab;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(dmb: DirectMaterialBorrower[]): string {
        return JSON.stringify(dmb);
    }

    static fromObject(obj: DirectMaterialBorrowerObj): DirectMaterialBorrower {
        if (obj === null) {
            return null;
        }
        const dmb: DirectMaterialBorrower = new DirectMaterialBorrower();
        dmb.Id = obj.Id;
        dmb.Quantity = obj.Quantity;
        if (obj.Borrower !== undefined) {
            dmb.Borrower = Borrower.fromObject(obj.Borrower);
        }
        if (obj.MaterialTab !== undefined) {
            dmb.MaterialTab = MaterialTab.fromObject(obj.MaterialTab);
        }
        return dmb;
    }

    static listFromObjectList(objlist: DirectMaterialBorrowerObj[]): DirectMaterialBorrower[] {
        const dmbs: DirectMaterialBorrower[] = [];
        for (const obj of objlist) {
            dmbs.push(DirectMaterialBorrower.fromObject(obj));
        }
        return dmbs;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Quantity"];
    }
    static selectStringList: string[] = ["DirectMaterialBorrower.Id", "DirectMaterialBorrower.Quantity"];
    static searchQueryString(search: string): string {
        return `DirectMaterialBorrower.Id LIKE '%${search}%' OR DirectMaterialBorrower.Quantity LIKE '%${search}%'`;
    }

    static async listSelectFromDB(Id: number, notId: number, search: string, withMaterialTab: boolean, withBorrower: boolean, materialTabId: number, notMaterialTabId: number, borrowerId: number, notBorrowerId: number): Promise<DirectMaterialBorrower[]> {
        //let dmbs: DirectMaterialBorrower[] = [];
        try {
            /*
            if (search === "") {
                dmbs = await App.app.dbmanager.directMaterialBorrowerRepo.find({
                    relations: ["Borrower", "MaterialTab"]
                });
            } else {
                dmbs = await App.app.dbmanager.directMaterialBorrowerRepo.createQueryBuilder("DirectMaterialBorrower")
                    .leftJoinAndSelect("DirectMaterialBorrower.Borrower", "Borrower")
                    .leftJoinAndSelect("DirectMaterialBorrower.MaterialTab", "MaterialTab")
                    .where([
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            Quantity: Like(`%${search}%`)
                        },
                    ])
                    .orWhere(`Borrower.id LIKE '%${search}%' OR Borrower.Name LIKE '%${search}%' OR Borrower.SerialNumber LIKE '%${search}%'`)
                    .orWhere(`MaterialTab.PartialRegistryCode LIKE '%${search}%' OR MaterialTab.Name LIKE '%${search}%'`)
                    .getMany();
            }
            return dmbs;
            */
            const dmbs_query = App.app.dbmanager.directMaterialBorrowerRepo.createQueryBuilder("DirectMaterialBorrower")
                .leftJoinAndSelect("DirectMaterialBorrower.MaterialTab", "MaterialTab")
                .leftJoinAndSelect("DirectMaterialBorrower.Borrower", "Borrower");

            if (Id !== null) {
                dmbs_query.andWhere(`DirectMaterialBorrower.Id = '${Id}'`);
            }
            if (notId !== null) {
                dmbs_query.andWhere(`DirectMaterialBorrower.Id != '${notId}'`);
            }
            if (search !== null) {
                let searchstring = DirectMaterialBorrower.searchQueryString(search);
                if (withMaterialTab) {
                    searchstring += ` OR ${MaterialTab.searchQueryString(search)}`;
                }
                if (withBorrower) {
                    searchstring += ` OR ${Borrower.searchQueryString(search)}`;
                }
                dmbs_query.andWhere(`(${searchstring})`);
            }
            if (materialTabId !== null) {
                dmbs_query.andWhere(`MaterialTab.Id = '${materialTabId}'`);
            }
            if (notMaterialTabId !== null) {
                dmbs_query.andWhere(`(MaterialTab.Id IS NULL OR MaterialTab.Id != '${notMaterialTabId}')`);
            }
            if (borrowerId !== null) {
                dmbs_query.andWhere(`Borrower.Id = '${borrowerId}'`);
            }
            if (notBorrowerId !== null) {
                dmbs_query.andWhere(`(Borrower.Id IS NULL OR Borrower.Id != '${notBorrowerId}')`);
            }
            dmbs_query.select(DirectMaterialBorrower.selectStringList);
            if (withMaterialTab) {
                dmbs_query.addSelect(MaterialTab.selectStringList);
            }
            if (withBorrower) {
                dmbs_query.addSelect(Borrower.selectStringList);
            }
            const dmbs: DirectMaterialBorrower[] = await dmbs_query.getMany();
            return dmbs;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async insertToDB(dmb: DirectMaterialBorrower): Promise<DirectMaterialBorrower> {
        try {
            const result = await App.app.dbmanager.directMaterialBorrowerRepo.createQueryBuilder().select("MAX(DirectMaterialBorrower.Id)", "max").getRawOne();
            const maxId = result.max;
            dmb.Id = 1 + maxId;
            await App.app.dbmanager.directMaterialBorrowerRepo.insert(dmb);
            return dmb;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.directMaterialBorrowerRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(dmb: DirectMaterialBorrower): Promise<DirectMaterialBorrower> {
        try {
            await App.app.dbmanager.directMaterialBorrowerRepo.update(dmb.Id, dmb);
            return dmb;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export interface DirectMaterialBorrowerObj {
    Id: number;
    Quantity: number;
    Borrower: BorrowerObj;
    MaterialTab: MaterialTabObj;
}
