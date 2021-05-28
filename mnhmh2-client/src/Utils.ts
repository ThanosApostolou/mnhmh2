export class Utils {

    static isIterable(obj: any): boolean {
        return obj !== undefined && obj !== null && typeof obj[Symbol.iterator] === "function";
    }
}