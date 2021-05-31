import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { DirectMaterialBorrower } from "../../../entities/DirectMaterialBorrower";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class DirectMaterialBorrowerDataGrid extends React.Component<DirectMaterialBorrowerDataGridProps, DirectMaterialBorrowerDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: DirectMaterialBorrowerDataGridProps;

    constructor(props: DirectMaterialBorrowerDataGridProps) {
        super(props);
        this.state = {
            directMaterialBorrowers: null,
            selectedDirectMaterialBorrower: null,
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
        this.setState({rows: [], loading : true, selectedDirectMaterialBorrower: null});
        DirectMaterialBorrower.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search,
            this.props.withMaterialTab, this.props.withBorrower,
            this.props.materialTabId, this.props.notMaterialTabId,
            this.props.borrowerId, this.props.notBorrowerId).then((data: any) => {
            this.setState({directMaterialBorrowers: data});
            this.setState({rows: DirectMaterialBorrower.getRows(this.state.directMaterialBorrowers)});
        }).catch((error) => {
            this.setState({directMaterialBorrowers: null});
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
        if (this.state.directMaterialBorrowers && this.state.directMaterialBorrowers !== null && this.state.directMaterialBorrowers.length > 0) {
            selectedSubcategory = this.state.directMaterialBorrowers[params.data.AA - 1];
        }
        this.setState({selectedDirectMaterialBorrower: selectedSubcategory});
        this.props.onRowSelected(selectedSubcategory);
    }

    componentDidUpdate(prevProps: DirectMaterialBorrowerDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={DirectMaterialBorrower.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface DirectMaterialBorrowerDataGridProps {
    actions: ReactNode;
    onRowSelected(directMaterialBorrower: DirectMaterialBorrower): void;
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

export interface DirectMaterialBorrowerDataGridState {
    directMaterialBorrowers: DirectMaterialBorrower[];
    selectedDirectMaterialBorrower: DirectMaterialBorrower;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

DirectMaterialBorrowerDataGrid.defaultProps = {
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