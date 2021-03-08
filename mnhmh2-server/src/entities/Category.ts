import { App } from "../App";

export class Category {
    Id: number;
    VersionTimestamp: string;
    Name: string;
    SerialNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(category: Category[]) {
        return JSON.stringify(category);
    }

    static fromObject(obj: any): Category {
        const category = new Category();
        category.Id = obj.Id;
        category.VersionTimestamp = obj.VersionTimestamp;
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

    static async listSelectFromDB(whereclause: string): Promise<Category[]> {
        const query: string = whereclause === null ? "SELECT * FROM Categories" : "SELECT * FROM Categories WHERE " + whereclause;
        let categories: Category[] = [];
        try {
            const result = await App.app.dbmanager.execute(query);
            categories = Category.listFromObjectList(result.recordset);
            return categories;
        } catch(err) {
            console.log(err);
            return (err);
        }
    }
}