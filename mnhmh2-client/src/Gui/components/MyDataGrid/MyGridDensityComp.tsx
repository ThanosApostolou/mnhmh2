import React, { ReactNode } from "react";

import { Button, Popover, MenuItem } from "@material-ui/core";
import { Reorder, ViewHeadline, ViewList, ViewStream } from "@material-ui/icons";
import { GridDensity } from "@material-ui/data-grid";

export class MyGridDensityComp extends React.Component<MyGridDensityCompProps, MyGridDensityCompState> {
    state: Readonly<MyGridDensityCompState>;

    constructor(props: MyGridDensityCompProps) {
        super(props);
        this.state = {
            anchorMenuEl: null,
            density: this.props.density,
        };
    }

    onDensityChange(density: GridDensity): void {
        this.setState({anchorMenuEl: null, density: density});
        if (this.props.onDensityChange) {
            this.props.onDensityChange(density);
        }
    }

    render(): ReactNode {

        return (
            <div>
                <Button color="primary" size="small" onClick={(event) => this.setState({anchorMenuEl: event.currentTarget})}>
                    <Reorder />
                    &nbsp;ΠΥΚΝΟΤΗΤΑ
                </Button>
                <Popover anchorEl={this.state.anchorMenuEl} open={Boolean(this.state.anchorMenuEl)} onClose={() => this.setState({anchorMenuEl: null})}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <MenuItem selected={this.state.density === "compact" ? true : false} onClick={() => this.onDensityChange("compact")}>
                        <ViewHeadline />
                                            &nbsp;Συμπαγής
                    </MenuItem>
                    <MenuItem selected={this.state.density === "standard" ? true : false} onClick={() => this.onDensityChange("standard")}>
                        <ViewList />
                                            &nbsp;Κανονική
                    </MenuItem>
                    <MenuItem selected={this.state.density === "comfortable" ? true : false} onClick={() => this.onDensityChange("comfortable")}>
                        <ViewStream />
                                            &nbsp;Άνετη
                    </MenuItem>
                </Popover>
            </div>
        );
    }
}

export interface MyGridDensityCompProps {
    density: string;
    onDensityChange?: (density: GridDensity) => void;
}
export interface MyGridDensityCompState {
    anchorMenuEl: HTMLButtonElement;
    density: string;
}