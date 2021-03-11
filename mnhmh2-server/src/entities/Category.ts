import { App } from "../App";
import { DBManager } from "../DBManager";

export class Category {
    Id: number;
    Name: string;
    SerialNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(category: Category[]): string {
        return JSON.stringify(category);
    }

    static fromObject(obj: CategoryObj): Category {
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

    static selectQuery(whereclause: string, prefix: string): string {
        const wherestring = whereclause === null ? "" : ` WHERE ${whereclause}`;
        const query = `
            (SELECT ${DBManager.columnsStringFromList(Category._getOwnFieldsList(), prefix)}
            FROM Categories
            ${wherestring})
        `;
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<Category[]> {
        let categories: Category[] = [];
        try {
            const result = await App.app.dbmanager.execute(Category.selectQuery(whereclause, ""));
            const recordset: CategoryObj[] = result.recordset;
            categories = Category.listFromDBObjectList(recordset, "");
            return categories;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}

export interface CategoryObj {
    Id: number;
    Name: string;
    SerialNumber: number;
}