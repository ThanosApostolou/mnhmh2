import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { ImportsExportsTbl } from "../../../entities/ImportsExportsTbl";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class ImportsExportsTblDataGrid extends React.Component<ImportsExportsTblDataGridProps, ImportsExportsTblDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: ImportsExportsTblDataGridProps;

    constructor(props: ImportsExportsTblDataGridProps) {
        super(props);
        this.state = {
            importsExportsTbls: null,
            selectedImportsExportsTbl: null,
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
        this.setState({rows: [], loading : true, selectedImportsExportsTbl: null});
        ImportsExportsTbl.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.fromDate, this.props.toDate, this.props.search,
            this.props.withMaterialTab, this.props.materialTabId, this.props.notMaterialTabId).then((data: any) => {
            this.setState({importsExportsTbls: data});
            this.setState({rows: ImportsExportsTbl.getRows(this.state.importsExportsTbls)});
        }).catch((error) => {
            this.setState({importsExportsTbls: null});
            this.setState({rows: []});
            this.setState({error: error});
            console.log("error", error);
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
        let selectedImportsExportsTbl = null;
        if (this.state.importsExportsTbls && this.state.importsExportsTbls !== null && this.state.importsExportsTbls.length > 0) {
            selectedImportsExportsTbl = this.state.importsExportsTbls[params.data.AA - 1];
        }
        this.setState({selectedImportsExportsTbl: selectedImportsExportsTbl});
        this.props.onRowSelected(selectedImportsExportsTbl);
    }

    componentDidUpdate(prevProps: ImportsExportsTblDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={ImportsExportsTbl.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface ImportsExportsTblDataGridProps {
    actions: ReactNode;
    onRowSelected(importsExportsTbl: ImportsExportsTbl): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    fromDate?: string;
    toDate?: string;
    search?: string;
    withMaterialTab?: boolean;
    withBorrower?: boolean;
    materialTabId?: number;
    notMaterialTabId?: number;
    borrowerId?: number;
    notBorrowerId?: number;
}

export interface ImportsExportsTblDataGridState {
    importsExportsTbls: ImportsExportsTbl[];
    selectedImportsExportsTbl: ImportsExportsTbl;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

ImportsExportsTblDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    fromDate: "",
    toDate: "",
    search: null,
    withMaterialTab: true,
    withBorrower: true,
    materialTabId: null,
    notMaterialTabId: null,
    borrowerId: null,
    notBorrowerId: null
};