import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { MaterialTab } from "../../../entities/MaterialTab";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { MaterialTabSelectDialog } from "./MaterialTabSelectDialog";

export class MaterialTabSingleDataGrid extends React.Component<MaterialTabSingleDataGridProps, MaterialTabSingleDataGridState> {
    static defaultProps: MaterialTabSingleDataGridProps;

    constructor(props: MaterialTabSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(materialTab: MaterialTab): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(materialTab);
    }

    componentDidMount(): void {
        console.log("MATERIAL_TAB:", this.props.materialTab);
        if (this.props.materialTab !== null) {
            this.setState({rows: MaterialTab.getRows([this.props.materialTab])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: MaterialTabSingleDataGridProps): void {
        if (this.props.materialTab !== prevProps.materialTab) {
            if (this.props.materialTab !== null) {
                this.setState({rows: MaterialTab.getRows([this.props.materialTab])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.materialTab === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={MaterialTab.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <MaterialTabSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface MaterialTabSingleDataGridProps {
    materialTab: MaterialTab;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (materialTab: MaterialTab) => void;
}

export interface MaterialTabSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

MaterialTabSingleDataGrid.defaultProps = {
    materialTab: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};