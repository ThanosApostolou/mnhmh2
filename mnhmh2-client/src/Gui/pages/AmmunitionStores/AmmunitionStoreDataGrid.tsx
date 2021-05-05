import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { AmmunitionStore } from "../../../entities/AmmunitionStore";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class AmmunitionStoreDataGrid extends React.Component<AmmunitionStoreDataGridProps, AmmunitionStoreDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: AmmunitionStoreDataGridProps;

    constructor(props: AmmunitionStoreDataGridProps) {
        super(props);
        this.state = {
            stores: null,
            selectedStore: null,
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
        this.setState({rows: [], loading : true, selectedStore: null});
        AmmunitionStore.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search).then((data: any) => {
            this.setState({stores: data});
            this.setState({rows: AmmunitionStore.getRows(this.state.stores)});
        }).catch((error) => {
            this.setState({stores: null});
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
        let selectedBorrower = null;
        if (this.state.stores && this.state.stores !== null && this.state.stores.length > 0) {
            selectedBorrower = this.state.stores[params.data.AA - 1];
        }
        this.setState({selectedStore: selectedBorrower});
        this.props.onRowSelected(selectedBorrower);
    }

    componentDidUpdate(prevProps: AmmunitionStoreDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={AmmunitionStore.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface AmmunitionStoreDataGridProps {
    actions: ReactNode;
    onRowSelected(store: AmmunitionStore): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    search?: string;
}

export interface AmmunitionStoreDataGridState {
    stores: AmmunitionStore[];
    selectedStore: AmmunitionStore;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

AmmunitionStoreDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    search: null,
};