import App from "./App";

export class SettingsManager {
    defaultServer: string;
    server: string;
    isServerDefault;
    defaultTheme: string;
    theme: string;
    isThemeDefault;

    init(): void {
        this.defaultServer = (window as any).settings.defaultServer;
        this.defaultTheme = (window as any).settings.defaultTheme;        
        this.readSettings();
    }

    readSettings(): void {
        this.readServerSetting();
        this.readThemeSetting();
        console.log(this.server, this.theme);
    }
    readServerSetting() {        
        this.server = window.localStorage.getItem("server");
        this.isServerDefault = false;
        if (this.server === null || this.server === "null") {
            this.server = this.defaultServer;
            this.isServerDefault = true;
        }
    }
    readThemeSetting() {        
        this.theme = window.localStorage.getItem("theme");
        this.isThemeDefault = false;
        if (this.theme === null || this.theme === "null") {
            this.theme = this.defaultTheme;
            this.isThemeDefault = true;
        }
        console.log("theme ", this.theme);
        App.app.thememanager.setTheme(this.theme);
    }


    setSettings(server: string, theme: string): void {
        window.localStorage.setItem("server", server);
        window.localStorage.setItem("theme", theme);
        this.readSettings();
    }
}