import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { SubcategoryContent } from "../../../entities/SubcategoryContent";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { SubcategoryContentSelectDialog } from "./SubcategoryContentSelectDialog";

export class SubcategoryContentSingleDataGrid extends React.Component<SubcategoryContentSingleDataGridProps, SubcategoryContentSingleDataGridState> {
    static defaultProps: SubcategoryContentSingleDataGridProps;

    constructor(props: SubcategoryContentSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(subcategoryContent: SubcategoryContent): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(subcategoryContent);
    }

    componentDidMount(): void {
        if (this.props.subcategoryContent !== null) {
            this.setState({rows: SubcategoryContent.getRows([this.props.subcategoryContent])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: SubcategoryContentSingleDataGridProps): void {
        if (this.props.subcategoryContent !== prevProps.subcategoryContent) {
            if (this.props.subcategoryContent !== null) {
                this.setState({rows: SubcategoryContent.getRows([this.props.subcategoryContent])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.subcategoryContent === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={SubcategoryContent.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <SubcategoryContentSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface SubcategoryContentSingleDataGridProps {
    subcategoryContent: SubcategoryContent;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (subcategoryContent: SubcategoryContent) => void;
}

export interface SubcategoryContentSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

SubcategoryContentSingleDataGrid.defaultProps = {
    subcategoryContent: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};