import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { AmmunitionPortion } from "../../../entities/AmmunitionPortion";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class AmmunitionPortionDataGrid extends React.Component<AmmunitionPortionDataGridProps, AmmunitionPortionDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: AmmunitionPortionDataGridProps;

    constructor(props: AmmunitionPortionDataGridProps) {
        super(props);
        this.state = {
            portions: null,
            selectedPortion: null,
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
        this.setState({rows: [], loading : true, selectedPortion: null});
        AmmunitionPortion.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search,
            this.props.withAmmunitionStore, this.props.withMaterialTab, this.props.ammunitionStoreId, this.props.notAmmunitionStoreId,
            this.props.materialTabId, this.props.notMaterialTabId,).then((data: any) => {
            this.setState({portions: data});
            this.setState({rows: AmmunitionPortion.getRows(this.state.portions)});
        }).catch((error) => {
            this.setState({portions: null});
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
        let selectedPortion = null;
        if (this.state.portions && this.state.portions !== null && this.state.portions.length > 0) {
            selectedPortion = this.state.portions[params.data.AA - 1];
        }
        this.setState({selectedPortion: selectedPortion});
        this.props.onRowSelected(selectedPortion);
    }

    componentDidUpdate(prevProps: AmmunitionPortionDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={AmmunitionPortion.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface AmmunitionPortionDataGridProps {
    actions: ReactNode;
    onRowSelected(portion: AmmunitionPortion): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    search?: string;
    withAmmunitionStore?: boolean;
    withMaterialTab?: boolean;
    ammunitionStoreId?: number;
    notAmmunitionStoreId?: number;
    materialTabId?: number;
    notMaterialTabId?: number;
}

export interface AmmunitionPortionDataGridState {
    portions: AmmunitionPortion[];
    selectedPortion: AmmunitionPortion;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

AmmunitionPortionDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    search: null,
    withAmmunitionStore: true,
    withMaterialTab: true,
    ammunitionStoreId: null,
    notAmmunitionStoreId: null,
    materialTabId: null,
    notMaterialTabId: null
};