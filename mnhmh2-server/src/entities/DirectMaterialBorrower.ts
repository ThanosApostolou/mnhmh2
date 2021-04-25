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
        dmb.Borrower = Borrower.fromObject(obj.Borrower);
        dmb.MaterialTab = MaterialTab.fromObject(obj.MaterialTab);
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

    static async listSelectFromDB(search: string): Promise<DirectMaterialBorrower[]> {
        let dmbs: DirectMaterialBorrower[] = [];
        try {
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
        } catch(err) {
            console.log(err);
            return (err);
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
