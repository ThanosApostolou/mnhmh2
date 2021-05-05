import React, { ReactNode } from "react";
import { Button } from "@material-ui/core";
import { Done } from "@material-ui/icons";

export class SelectActions extends React.Component<SelectActionsProps, any> {
    constructor(props: SelectActionsProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <Button size="small" color="primary" onClick={this.props.onSelectClick} disabled={this.props.disabledSelect} key={0}>
                    <Done />
                    &nbsp;Επιλογή
                </Button>
            </div>
        );
    }
}

export interface SelectActionsProps {
    disabledSelect: boolean;
    onSelectClick(): void;
}