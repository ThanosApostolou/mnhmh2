import App from "./App";
import axios, { AxiosInstance } from "axios";

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

}