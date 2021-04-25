import React, { ReactNode } from "react";
import { Button } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

export class AddRemoveActions extends React.Component<AddEditActionsProps, any> {
    constructor(props: AddEditActionsProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <Button size="small" color="primary" onClick={this.props.onAddClick} key={0}>
                    <Add />
                    &nbsp;Προσθηκη
                </Button>
                <Button size="small" color="primary" onClick={this.props.onRemoveClick} disabled={this.props.disabledRemove} key={1}>
                    <Delete />
                    &nbsp;Αφαίρεση
                </Button>
            </div>
        );
    }
}

export interface AddEditActionsProps {
    disabledRemove: boolean;
    onAddClick(): void;
    onRemoveClick(): void;
}