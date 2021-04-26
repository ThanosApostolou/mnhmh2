import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Borrower } from "../../../entities/Borrower";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class BorrowerDataGrid extends React.Component<BorrowerDataGridProps, BorrowerDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: BorrowerDataGridProps;

    constructor(props: BorrowerDataGridProps) {
        super(props);
        this.state = {
            borrowers: null,
            selectedBorrower: null,
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
        this.setState({rows: []});
        this.setState({loading : true});
        Borrower.listFromApi(this.cancelTokenSource, this.props.search, this.props.withManager, this.props.managerId, this.props.notManagerId).then((data: any) => {
            this.setState({borrowers: data});
            this.setState({rows: Borrower.getRows(this.state.borrowers, this.props.withManager)});
        }).catch((error) => {
            this.setState({borrowers: null});
            this.setState({rows: []});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    cancelFetchData(): void {
        this.cancelTokenSource.cancel("cancel fetching data");
    }

    onRowSelected(params: GridRowSelectedParams): void {
        let selectedBorrower = null;
        if (this.state.borrowers && this.state.borrowers !== null && this.state.borrowers.length > 0) {
            selectedBorrower = this.state.borrowers[params.data.AA - 1];
        }
        this.setState({selectedBorrower: selectedBorrower});
        this.props.onRowSelected(selectedBorrower);
    }

    componentDidUpdate(prevProps: BorrowerDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Borrower.getColumns(this.props.withManager)} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface BorrowerDataGridProps {
    actions: ReactNode;
    onRowSelected(borrower: Borrower): void;
    storagePrefix: string;
    fetchData: boolean;
    search?: string;
    withManager?: boolean;
    managerId?: number;
    notManagerId?: number;
}

export interface BorrowerDataGridState {
    borrowers: Borrower[];
    selectedBorrower: Borrower;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

BorrowerDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    search: null,
    withManager: true,
    managerId: null,
    notManagerId: null
};