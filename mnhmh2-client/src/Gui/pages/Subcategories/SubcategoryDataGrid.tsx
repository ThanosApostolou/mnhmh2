import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Subcategory } from "../../../entities/Subcategory";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class SubcategoryDataGrid extends React.Component<SubcategoryDataGridProps, SubcategoryDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: SubcategoryDataGridProps;

    constructor(props: SubcategoryDataGridProps) {
        super(props);
        this.state = {
            subcategories: null,
            selectedSubcategory: null,
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
        this.setState({rows: [], loading : true, selectedSubcategory: null});
        Subcategory.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search,
            this.props.withMaterialTab, this.props.withBorrower,
            this.props.materialTabId, this.props.notMaterialTabId,
            this.props.borrowerId, this.props.notBorrowerId).then((data: any) => {
            this.setState({subcategories: data});
            this.setState({rows: Subcategory.getRows(this.state.subcategories)});
        }).catch((error) => {
            this.setState({subcategories: null});
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
        if (this.state.subcategories && this.state.subcategories !== null && this.state.subcategories.length > 0) {
            selectedSubcategory = this.state.subcategories[params.data.AA - 1];
        }
        this.setState({selectedSubcategory: selectedSubcategory});
        this.props.onRowSelected(selectedSubcategory);
    }

    componentDidUpdate(prevProps: SubcategoryDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Subcategory.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface SubcategoryDataGridProps {
    actions: ReactNode;
    onRowSelected(subcategory: Subcategory): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    search?: string;
    withMaterialTab?: boolean;
    withBorrower?: boolean;
    materialTabId?: number;
    notMaterialTabId?: number;
    borrowerId?: number;
    notBorrowerId?: number;
}

export interface SubcategoryDataGridState {
    subcategories: Subcategory[];
    selectedSubcategory: Subcategory;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

SubcategoryDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    search: null,
    withMaterialTab: true,
    withBorrower: true,
    materialTabId: null,
    notMaterialTabId: null,
    borrowerId: null,
    notBorrowerId: null
};