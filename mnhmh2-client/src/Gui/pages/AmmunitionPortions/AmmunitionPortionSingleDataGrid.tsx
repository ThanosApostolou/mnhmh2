import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { AmmunitionPortion } from "../../../entities/AmmunitionPortion";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { AmmunitionPortionSelectDialog } from "./AmmunitionPortionSelectDialog";

export class AmmunitionPortionSingleDataGrid extends React.Component<AmmunitionPortionSingleDataGridProps, AmmunitionPortionSingleDataGridState> {
    static defaultProps: AmmunitionPortionSingleDataGridProps;

    constructor(props: AmmunitionPortionSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(ammunitionPortion: AmmunitionPortion): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(ammunitionPortion);
    }

    componentDidMount(): void {
        if (this.props.ammunitionPortion !== null) {
            this.setState({rows: AmmunitionPortion.getRows([this.props.ammunitionPortion])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: AmmunitionPortionSingleDataGridProps): void {
        if (this.props.ammunitionPortion !== prevProps.ammunitionPortion) {
            if (this.props.ammunitionPortion !== null) {
                this.setState({rows: AmmunitionPortion.getRows([this.props.ammunitionPortion])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.ammunitionPortion === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={AmmunitionPortion.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <AmmunitionPortionSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface AmmunitionPortionSingleDataGridProps {
    ammunitionPortion: AmmunitionPortion;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (ammunitionPortion: AmmunitionPortion) => void;
}

export interface AmmunitionPortionSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

AmmunitionPortionSingleDataGrid.defaultProps = {
    ammunitionPortion: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};