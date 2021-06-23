import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { SubcategoryContent } from "../../../entities/SubcategoryContent";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class SubcategoryContentDataGrid extends React.Component<SubcategoryContentDataGridProps, SubcategoryContentDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: SubcategoryContentDataGridProps;

    constructor(props: SubcategoryContentDataGridProps) {
        super(props);
        this.state = {
            subcategoryContents: null,
            selectedSubcategoryContent: null,
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
        this.setState({rows: [], loading : true, selectedSubcategoryContent: null});
        SubcategoryContent.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search,
            this.props.withSubcategoryBelongingTo, this.props.withSubcategoryContentTab,
            this.props.subcategoryBelongingToId, this.props.notSubcategoryBelongingToId,
            this.props.subcategoryContentTabId, this.props.notSubcategoryContentTabId).then((data: any) => {
            this.setState({subcategoryContents: data});
            this.setState({rows: SubcategoryContent.getRows(this.state.subcategoryContents)});
        }).catch((error) => {
            this.setState({subcategoryContents: null});
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
        let selectedSubcategoryContent = null;
        if (this.state.subcategoryContents && this.state.subcategoryContents !== null && this.state.subcategoryContents.length > 0) {
            selectedSubcategoryContent = this.state.subcategoryContents[params.data.AA - 1];
        }
        this.setState({selectedSubcategoryContent: selectedSubcategoryContent});
        this.props.onRowSelected(selectedSubcategoryContent);
    }

    componentDidUpdate(prevProps: SubcategoryContentDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={SubcategoryContent.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface SubcategoryContentDataGridProps {
    actions: ReactNode;
    onRowSelected(subcategoryContent: SubcategoryContent): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    search?: string;
    withSubcategoryBelongingTo?: boolean;
    withSubcategoryContentTab?: boolean;
    subcategoryBelongingToId?: number;
    notSubcategoryBelongingToId?: number;
    subcategoryContentTabId?: number;
    notSubcategoryContentTabId?: number;
}

export interface SubcategoryContentDataGridState {
    subcategoryContents: SubcategoryContent[];
    selectedSubcategoryContent: SubcategoryContent;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

SubcategoryContentDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    search: null,
    withSubcategoryBelongingTo: true,
    withSubcategoryContentTab: true,
    subcategoryBelongingToId: null,
    notSubcategoryBelongingToId: null,
    subcategoryContentTabId: null,
    notSubcategoryContentTabId: null
};