import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import App from "../App";

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

    static async listFromApi(): Promise<Category[]> {
        try {
            const response = await App.app.apiconsumer.axios.request({
                method: "get",
                url: "/category"
            });
            const categories: Category[] = Category.listFromObjectList(response.data);
            return categories;
        } catch (error) {
            return error;
        }
    }

    static getColumns(): GridColDef[] {
        const columns: GridColDef[] = [
            { field: "AA", headerName: "AA" },
            { field: "Id", headerName: "Id" },
            { field: "VersionTimestamp", headerName: "VersionTimestamp" },
            { field: "Name", headerName: "Name" },
            { field: "SerialNumber", headerName: "SerialNumber" }
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
                VersionTimestamp: JSON.stringify(category.VersionTimestamp),
                Name: category.Name,
                SerialNumber: category.SerialNumber
            };
            count++;
            rows.push(row);
        }
        return rows;

    }

}