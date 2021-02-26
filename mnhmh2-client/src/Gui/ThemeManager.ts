import { createMuiTheme, PaletteType, Theme } from "@material-ui/core";
import App from "../App";

export class ThemeManager {
    theme: Theme;
    type: string;

    constructor() {
        this.theme = null;
    }

    init(): void {
        this.theme = createMuiTheme({
            palette: {
                type: "dark",
            }
        });
    }

    setTheme(theme: string): void {
        this.theme = createMuiTheme({
            palette: {
                type: theme as PaletteType,
            }
        });
        this.type = theme;
        App.app.setState({thememanager: this});
    }

}