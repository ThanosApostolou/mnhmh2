import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Category } from "../../../entities/Category";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class CategoryDataGrid extends React.Component<CategoryDataGridProps, CategoryDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: CategoryDataGridProps;

    constructor(props: CategoryDataGridProps) {
        super(props);
        this.state = {
            categories: null,
            selectedCategory: null,
            rows: [],
            loading: true,
            error: null,
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }



    fetchData(): void {
        console.log("fetch data", this.props.search);
        this.cancelFetchData();
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.setState({rows: [], loading : true, selectedCategory: null});
        Category.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search).then((data: any) => {
            this.setState({categories: data});
            this.setState({rows: Category.getRows(this.state.categories)});
        }).catch((error) => {
            this.setState({categories: null});
            this.setState({rows: []});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
        });
        if (this.props.onFetchData) {
            this.props.onFetchData();
        }
    }

    cancelFetchData(): void {
        this.cancelTokenSource.cancel("cancel fetching data");
    }

    onRowSelected(params: GridRowSelectedParams): void {
        let selectedSubcategory = null;
        if (this.state.categories && this.state.categories !== null && this.state.categories.length > 0) {
            selectedSubcategory = this.state.categories[params.data.AA - 1];
        }
        this.setState({selectedCategory: selectedSubcategory});
        this.props.onRowSelected(selectedSubcategory);
    }

    componentDidUpdate(prevProps: CategoryDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Category.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface CategoryDataGridProps {
    actions: ReactNode;
    onRowSelected(category: Category): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    search?: string;
}

export interface CategoryDataGridState {
    categories: Category[];
    selectedCategory: Category;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

CategoryDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    search: null
};