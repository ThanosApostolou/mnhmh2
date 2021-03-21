import App from "./App";

export class SettingsManager {
    defaultServer: string;
    server: string;
    isServerDefault: boolean;
    defaultTheme: string;
    theme: string;
    isThemeDefault: boolean;
    defaultTextOverflowEllipsis: boolean;
    textOverflowEllipsis: boolean;
    isTextOverflowEllipsisDefault: boolean;

    init(): void {
        this.defaultServer = (window as any).settings.defaultServer;
        this.defaultTheme = (window as any).settings.defaultTheme;
        this.defaultTextOverflowEllipsis = (window as any).settings.defaultTextOverflowEllipsis;
        this.readSettings();
    }

    readSettings(): void {
        this.readServerSetting();
        this.readThemeSetting();
        this.readTextOverflowEllipsisSetting();
        console.log(this.server, this.theme);
    }
    readServerSetting(): void {
        this.server = window.localStorage.getItem("server");
        this.isServerDefault = false;
        if (this.server === null || this.server === "null") {
            this.server = this.defaultServer;
            this.isServerDefault = true;
        }
        App.app.apiconsumer.updateConfig();
        App.app.setState({settingsmanager: this});
    }
    readThemeSetting(): void {
        this.theme = window.localStorage.getItem("theme");
        this.isThemeDefault = false;
        if (this.theme === null || this.theme === "null") {
            this.theme = this.defaultTheme;
            this.isThemeDefault = true;
        }
        console.log("theme ", this.theme);
        App.app.thememanager.setTheme(this.theme);
    }
    readTextOverflowEllipsisSetting(): void {
        this.textOverflowEllipsis = window.localStorage.getItem("textOverflowEllipsis") === "true";
        this.isTextOverflowEllipsisDefault = false;
        if (window.localStorage.getItem("textOverflowEllipsis") === "null") {
            this.textOverflowEllipsis = this.defaultTextOverflowEllipsis;
            this.isTextOverflowEllipsisDefault = true;
        }
    }


    setSettings(server: string, theme: string, textOverflowEllipsis: boolean): void {
        window.localStorage.setItem("server", server);
        window.localStorage.setItem("theme", theme);
        if (textOverflowEllipsis === null) {
            window.localStorage.setItem("textOverflowEllipsis", null);
        } else {
            window.localStorage.setItem("textOverflowEllipsis", textOverflowEllipsis.toString());
        }
        this.readSettings();
    }
}