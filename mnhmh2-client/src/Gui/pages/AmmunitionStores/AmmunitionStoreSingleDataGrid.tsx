import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { AmmunitionStore } from "../../../entities/AmmunitionStore";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { AmmunitionStoreSelectDialog } from "./AmmunitionStoreSelectDialog";

export class AmmunitionStoreSingleDataGrid extends React.Component<AmmunitionStoreSingleDataGridProps, AmmunitionStoreSingleDataGridState> {
    static defaultProps: AmmunitionStoreSingleDataGridProps;

    constructor(props: AmmunitionStoreSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(ammunitionStore: AmmunitionStore): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(ammunitionStore);
    }

    componentDidMount(): void {
        if (this.props.ammunitionStore !== null) {
            this.setState({rows: AmmunitionStore.getRows([this.props.ammunitionStore])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: AmmunitionStoreSingleDataGridProps): void {
        if (this.props.ammunitionStore !== prevProps.ammunitionStore) {
            if (this.props.ammunitionStore !== null) {
                this.setState({rows: AmmunitionStore.getRows([this.props.ammunitionStore])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.ammunitionStore === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={AmmunitionStore.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <AmmunitionStoreSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface AmmunitionStoreSingleDataGridProps {
    ammunitionStore: AmmunitionStore;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (ammunitionStore: AmmunitionStore) => void;
}

export interface AmmunitionStoreSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

AmmunitionStoreSingleDataGrid.defaultProps = {
    ammunitionStore: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};