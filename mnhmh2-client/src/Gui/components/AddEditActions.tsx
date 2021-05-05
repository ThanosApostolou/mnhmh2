import React, { ReactNode } from "react";
import { Button } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";

export class AddEditActions extends React.Component<AddEditActionsProps, any> {
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
                <Button size="small" color="primary" onClick={this.props.onEditClick} disabled={this.props.disabledEdit} key={1}>
                    <Edit />
                    &nbsp;Τροποποιηση
                </Button>
            </div>
        );
    }
}

export interface AddEditActionsProps {
    disabledEdit: boolean;
    onAddClick(): void;
    onEditClick(): void;
}