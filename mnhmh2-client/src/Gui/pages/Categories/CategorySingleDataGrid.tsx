import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Category } from "../../../entities/Category";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { CategorySelectDialog } from "./CategorySelectDialog";

export class CategorySingleDataGrid extends React.Component<CategorySingleDataGridProps, CategorySingleDataGridState> {
    static defaultProps: CategorySingleDataGridProps;

    constructor(props: CategorySingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(category: Category): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(category);
    }

    componentDidMount(): void {
        if (this.props.category !== null) {
            this.setState({rows: Category.getRows([this.props.category])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: CategorySingleDataGridProps): void {
        if (this.props.category !== prevProps.category) {
            if (this.props.category !== null) {
                this.setState({rows: Category.getRows([this.props.category])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.category === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={Category.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <CategorySelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface CategorySingleDataGridProps {
    category: Category;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (category: Category) => void;
}

export interface CategorySingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

CategorySingleDataGrid.defaultProps = {
    category: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};