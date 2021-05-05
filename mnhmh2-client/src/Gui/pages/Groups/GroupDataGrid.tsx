import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Group } from "../../../entities/Group";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class GroupDataGrid extends React.Component<GroupDataGridProps, GroupDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: GroupDataGridProps;

    constructor(props: GroupDataGridProps) {
        super(props);
        this.state = {
            groups: null,
            selectedGroup: null,
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
        this.setState({rows: [], loading : true, selectedGroup: null});
        Group.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search).then((data: any) => {
            this.setState({groups: data});
            this.setState({rows: Group.getRows(this.state.groups)});
        }).catch((error) => {
            this.setState({groups: null});
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
        if (this.state.groups && this.state.groups !== null && this.state.groups.length > 0) {
            selectedBorrower = this.state.groups[params.data.AA - 1];
        }
        this.setState({selectedGroup: selectedBorrower});
        this.props.onRowSelected(selectedBorrower);
    }

    componentDidUpdate(prevProps: GroupDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Group.getColumns()} storagePrefix={this.props.storagePrefix}
                actions={this.props.actions}
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
                onRowSelected={this.onRowSelected.bind(this)}
            />
        );
    }
}

export interface GroupDataGridProps {
    actions: ReactNode;
    onRowSelected(group: Group): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    search?: string;
}

export interface GroupDataGridState {
    groups: Group[];
    selectedGroup: Group;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

GroupDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    search: null,
};