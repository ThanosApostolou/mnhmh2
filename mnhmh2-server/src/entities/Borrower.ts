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
        borrower.Manager = Manager.fromObject(obj.Manager);
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

    static async listSelectFromDB(search: string): Promise<Borrower[]> {
        let borrowers: Borrower[] = [];
        try {
            if (search === "") {
                borrowers = await App.app.dbmanager.borrowerRepo.find({
                    relations: ["Manager"]
                });
            } else {
                borrowers = await App.app.dbmanager.borrowerRepo.createQueryBuilder("Borrower")
                    .leftJoinAndSelect("Borrower.Manager", "Manager")
                    .where(`Borrower.id LIKE '%${search}%' OR Borrower.Name LIKE '%${search}%' OR Borrower.SerialNumber LIKE '%${search}%' OR Manager.Id LIKE '%${search}%' OR Manager.Name LIKE '%${search}%' OR Manager.Rank LIKE '%${search}%' OR Manager.Position LIKE '%${search}%'`)
                    .getMany();
            }
            return borrowers;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(borrower: Borrower): Promise<Borrower> {
        try {
            const result = await App.app.dbmanager.borrowerRepo.createQueryBuilder().select("MAX(Borrower.Id)", "max").getRawOne();
            const maxId = result.max;
            borrower.Id = 1 + maxId;
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
