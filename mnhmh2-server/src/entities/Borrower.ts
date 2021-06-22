import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { App } from "../App";
import { Manager, ManagerObj } from "./Manager";

@Entity({name: "Borrowers"})
export class Borrower {
    @PrimaryColumn()
    Id: number;
    @Column()
    Name: string;
    @Column()
    SerialNumber: number;

    @ManyToOne(() => Manager, (manager) => manager.borrowers)
    @JoinColumn({name: "Manager"})
    Manager: Manager;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(borrower: Borrower[]): string {
        return JSON.stringify(borrower);
    }

    static fromObject(obj: BorrowerObj): Borrower {
        if (obj === null) {
            return null;
        }
        const borrower = new Borrower();
        borrower.Id = obj.Id;
        borrower.Name = obj.Name;
        borrower.SerialNumber = obj.SerialNumber;
        if (obj.Manager !== undefined) {
            borrower.Manager = Manager.fromObject(obj.Manager);
        }
        return borrower;
    }

    static listFromObjectList(objlist: any[]): Borrower[] {
        const borrowers: Borrower[] = [];
        for (const obj of objlist) {
            borrowers.push(Borrower.fromObject(obj));
        }
        return borrowers;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "SerialNumber"];
    }
    static selectStringList: string[] = ["Borrower.Id", "Borrower.Name", "Borrower.SerialNumber"];
    static searchQueryString(search: string): string {
        return `Borrower.Id LIKE '%${search}%' OR Borrower.Name LIKE '%${search}%' OR Borrower.SerialNumber LIKE '%${search}%'`;
    }

    static async listSelectFromDB(Id: number, notId: number, search: string, withManager: boolean, managerId: number, notManagerId: number): Promise<Borrower[]> {
        try {
            const borrowers_query = App.app.dbmanager.borrowerRepo.createQueryBuilder("Borrower").leftJoinAndSelect("Borrower.Manager", "Manager");

            if (Id !== null) {
                borrowers_query.andWhere(`Borrower.Id = '${Id}'`);
            }
            if (notId !== null) {
                borrowers_query.andWhere(`Borrower.Id != '${notId}'`);
            }
            if (search !== null) {
                let searchquery = Borrower.searchQueryString(search);
                if (withManager) {
                    searchquery += ` OR ${Manager.searchQueryString(search)}`;
                }
                borrowers_query.andWhere(`(${searchquery})`);
            }
            if (managerId !== null) {
                borrowers_query.andWhere(`Manager.Id = '${managerId}'`);
            }
            if (notManagerId !== null) {
                borrowers_query.andWhere(`(Manager.Id IS NULL OR Manager.Id != '${notManagerId}')`);
            }
            borrowers_query.select(Borrower.selectStringList);
            if (withManager) {
                borrowers_query.addSelect(Manager.selectStringList);
            }
            const borrowers: Borrower[] = await borrowers_query.getMany();
            return borrowers;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async insertToDB(borrower: Borrower): Promise<Borrower> {
        try {
            const result = await App.app.dbmanager.borrowerRepo.createQueryBuilder().select("MAX(Borrower.Id)", "maxId").addSelect("Max(Borrower.SerialNumber)", "maxSerialNumber").getRawOne();
            const maxId = result["maxId"];
            borrower.Id = 1 + maxId;
            const maxSerialNumber = result["maxSerialNumber"];
            borrower.SerialNumber = 1 + maxSerialNumber;
            await App.app.dbmanager.borrowerRepo.insert(borrower);
            return borrower;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.borrowerRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(borrower: Borrower): Promise<Borrower> {
        try {
            delete borrower["SerialNumber"];
            await App.app.dbmanager.borrowerRepo.update(borrower.Id, borrower);
            return borrower;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export interface BorrowerObj {
    Id: number;
    Name: string;
    SerialNumber: number;
    Manager: ManagerObj;
}
