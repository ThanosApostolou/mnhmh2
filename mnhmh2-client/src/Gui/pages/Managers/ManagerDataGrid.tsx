import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Manager } from "../../../entities/Manager";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class ManagerDataGrid extends React.Component<ManagerDataGridProps, ManagerDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: ManagerDataGridProps;

    constructor(props: ManagerDataGridProps) {
        super(props);
        this.state = {
            managers: null,
            selectedManager: null,
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
        this.setState({rows: [], loading : true, selectedManager: null});
        Manager.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search).then((data: any) => {
            this.setState({managers: data});
            this.setState({rows: Manager.getRows(this.state.managers)});
        }).catch((error) => {
            this.setState({managers: null});
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
        if (this.state.managers && this.state.managers !== null && this.state.managers.length > 0) {
            selectedBorrower = this.state.managers[params.data.AA - 1];
        }
        this.setState({selectedManager: selectedBorrower});
        this.props.onRowSelected(selectedBorrower);
    }

    componentDidUpdate(prevProps: ManagerDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Manager.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface ManagerDataGridProps {
    actions: ReactNode;
    onRowSelected(manager: Manager): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    search?: string;
}

export interface ManagerDataGridState {
    managers: Manager[];
    selectedManager: Manager;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

ManagerDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    search: null,
};