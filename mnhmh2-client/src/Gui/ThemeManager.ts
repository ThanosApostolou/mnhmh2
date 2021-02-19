import { createMuiTheme, Theme } from "@material-ui/core";

export class ThemeManager {
    theme: Theme;

    constructor() {
        this.theme = null;
    }

    init() {
        this.theme = createMuiTheme({
            palette: {
                type: "dark",
            },
        });
    }

}