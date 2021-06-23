import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Subcategory } from "../../../entities/Subcategory";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { SubcategorySelectDialog } from "./SubcategorySelectDialog";

export class SubcategorySingleDataGrid extends React.Component<SubcategorySingleDataGridProps, SubcategorySingleDataGridState> {
    static defaultProps: SubcategorySingleDataGridProps;

    constructor(props: SubcategorySingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(subcategory: Subcategory): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(subcategory);
    }

    componentDidMount(): void {
        if (this.props.subcategory !== null) {
            this.setState({rows: Subcategory.getRows([this.props.subcategory])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: SubcategorySingleDataGridProps): void {
        if (this.props.subcategory !== prevProps.subcategory) {
            if (this.props.subcategory !== null) {
                this.setState({rows: Subcategory.getRows([this.props.subcategory])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.subcategory === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={Subcategory.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <SubcategorySelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface SubcategorySingleDataGridProps {
    subcategory: Subcategory;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (subcategory: Subcategory) => void;
}

export interface SubcategorySingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

SubcategorySingleDataGrid.defaultProps = {
    subcategory: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};