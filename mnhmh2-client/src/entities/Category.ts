import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { CancelTokenSource } from "axios";
import App from "../App";

export class Category {
    Id: number;
    Name: string;
    SerialNumber: number;

    toJson(): string {
        return JSON.stringify(this);
    }

    static listToJson(category: Category[]) {
        return JSON.stringify(category);
    }

    static fromObject(obj: any): Category {
        if (!obj) {
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

    static async listFromApi(cancelTokenSource: CancelTokenSource): Promise<Category[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/category",
                cancelToken: cancelTokenSource.token,
            });
            const categories: Category[] = Category.listFromObjectList(response.data);
            return categories;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA", width: 100, hide: false },
            { field: "Id", headerName: "Id", width: 100, hide: false },
            { field: "Name", headerName: "ΟΝΟΜΑ", width: 200, hide: false },
            { field: "SerialNumber", headerName: "ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ", width: 200, hide: false }
        ];
        return columns;
    }

    static getRows(categories: Category[]): GridRowsProp {
        const rows: GridRowsProp = [];
        let count = 1;
        for (const category of categories) {
            const row: GridRowData = {
                id: count,
                AA: count,
                Id: category.Id,
                Name: category.Name,
                SerialNumber: category.SerialNumber
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}