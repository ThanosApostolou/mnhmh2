import { App } from "../App";

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

    static fromDBObject(obj: CategoryDBObj): Category {
        const category = new Category();
        category.Id = obj["Categories.Id"];
        category.Name = obj["Categories.Name"];
        category.SerialNumber = obj["Categories.SerialNumber"];
        return category;
    }
    static listFromDBObjectList(objlist: CategoryDBObj[]): Category[] {
        const categories: Category[] = [];
        for (const obj of objlist) {
            categories.push(Category.fromDBObject(obj));
        }
        return categories;
    }

    private static _selectColumns(): string {
        const columns = "Categories.Id as [Categories.Id], Categories.Name as [Categories.Name], Categories.SerialNumber as [Categories.SerialNumber]";
        return columns;
    }
    static selectQuery(whereclause: string): string {
        let query = `
            (SELECT ${Category._selectColumns()}
            FROM Categories
        `;
        if (whereclause != null) {
            query += " WHERE " + whereclause;
        }
        query += ")";
        return query;
    }

    static async listSelectFromDB(whereclause: string): Promise<Category[]> {
        let categories: Category[] = [];
        try {
            const result = await App.app.dbmanager.execute(Category.selectQuery(whereclause));
            categories = Category.listFromDBObjectList(result.recordset);
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

export interface CategoryDBObj {
    "Categories.Id": number;
    "Categories.Name": string;
    "Categories.SerialNumber": number;
}