import App from "./App";
import axios, { AxiosInstance, CancelTokenSource } from "axios";

export class ApiConsumer {
    axios: AxiosInstance;
    /**
     * Updates config { baseURL } from settingsmanager
     */
    updateConfig(): void {
        this.axios = axios.create({
            baseURL: App.app.settingsmanager.server + "/api"
        });
    }

    static getCancelTokenSource(): CancelTokenSource {
        const source = axios.CancelToken.source();
        return source;
    }

    static isCancel(error: string): boolean {
        return axios.isCancel(error);
    }

    static getErrorMessage(error: any): string {
        if (error.response && error.response.status && error.response.data && error.response.data.error) {
            return `: ${error.response.status}: ${error.response.data.error}`;
        } else {
            return "";
        }
    }
}