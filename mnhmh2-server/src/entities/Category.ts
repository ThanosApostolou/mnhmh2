import {Entity, PrimaryColumn, Column, Like, JoinColumn } from "typeorm";

import { App } from "../App";
import { DBManager } from "../DBManager";

@Entity({name: "Categories"})
export class Category {
    @PrimaryColumn()
    Id: number;
    @Column()
    Name: string;
    @Column()
    SerialNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(category: Category[]): string {
        return JSON.stringify(category);
    }

    static fromObject(obj: CategoryObj): Category {
        if (obj === null) {
            return null;
        }
        const category = new Category();
        category.Id = obj.Id;
        category.Name = obj.Name;
        category.SerialNumber = obj.SerialNumber;
        return category;
    }

    static listFromObjectList(objlist: any[]): Category[] {
        const categories: Category[] = [];
        for (const obj of objlist) {
            categories.push(Category.fromObject(obj));
        }
        return categories;
    }

    static fromDBObject(obj: any, prefix: string): Category {
        const category = new Category();
        category.Id = obj[`${prefix}Id`];
        category.Name = obj[`${prefix}Name`];
        category.SerialNumber = obj[`${prefix}SerialNumber`];
        return category;
    }
    static listFromDBObjectList(objlist: any[], prefix: string): Category[] {
        const categories: Category[] = [];
        for (const obj of objlist) {
            categories.push(Category.fromDBObject(obj, prefix));
        }
        return categories;
    }

    /**
     * Returns a list with table's own (non foreign) fields
     */
    private static _getOwnFieldsList(): string[] {
        return ["Id", "Name", "SerialNumber"];
    }

    static async listSelectFromDB(search: string): Promise<Category[]> {
        let categories: Category[] = [];
        try {
            if (search === "") {
                categories = await App.app.dbmanager.categoryRepo.find();
            } else {
                categories = await App.app.dbmanager.categoryRepo.find({
                    where: [
                        {
                            Id: Like(`%${search}%`)
                        },
                        {
                            Name: Like(`%${search}%`)
                        },
                        {
                            SerialNumber: Like(`%${search}%`)
                        }
                    ]
                });
            }
            return categories;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
    static async insertToDB(category: Category): Promise<Category> {
        try {
            const result = await App.app.dbmanager.categoryRepo.createQueryBuilder().select("MAX(Category.Id)", "max").getRawOne();
            const maxId = result.max;
            category.Id = 1 + maxId;
            await App.app.dbmanager.categoryRepo.insert(category);
            return category;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteInDB(Id: number): Promise<void> {
        try {
            await App.app.dbmanager.categoryRepo.delete(Id);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    static async updateInDB(category: Category): Promise<Category> {
        try {
            await App.app.dbmanager.categoryRepo.update(category.Id, category);
            return category;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export interface CategoryObj {
    Id: number;
    Name: string;
    SerialNumber: number;
}