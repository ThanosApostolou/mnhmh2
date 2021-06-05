import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { DirectMaterialBorrower } from "../../../entities/DirectMaterialBorrower";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { DirectMaterialBorrowerSelectDialog } from "./DirectMaterialBorrowerSelectDialog";

export class DirectMaterialBorrowerSingleDataGrid extends React.Component<DirectMaterialBorrowerSingleDataGridProps, DirectMaterialBorrowerSingleDataGridState> {
    static defaultProps: DirectMaterialBorrowerSingleDataGridProps;

    constructor(props: DirectMaterialBorrowerSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(directMaterialBorrower: DirectMaterialBorrower): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(directMaterialBorrower);
    }

    componentDidMount(): void {
        if (this.props.directMaterialBorrower !== null) {
            this.setState({rows: DirectMaterialBorrower.getRows([this.props.directMaterialBorrower])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: DirectMaterialBorrowerSingleDataGridProps): void {
        if (this.props.directMaterialBorrower !== prevProps.directMaterialBorrower) {
            if (this.props.directMaterialBorrower !== null) {
                this.setState({rows: DirectMaterialBorrower.getRows([this.props.directMaterialBorrower])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.directMaterialBorrower === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={DirectMaterialBorrower.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <DirectMaterialBorrowerSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface DirectMaterialBorrowerSingleDataGridProps {
    directMaterialBorrower: DirectMaterialBorrower;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (directMaterialBorrower: DirectMaterialBorrower) => void;
}

export interface DirectMaterialBorrowerSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

DirectMaterialBorrowerSingleDataGrid.defaultProps = {
    directMaterialBorrower: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};