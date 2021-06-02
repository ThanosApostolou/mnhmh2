import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { MaterialTab } from "../../../entities/MaterialTab";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";

export class MaterialTabDataGrid extends React.Component<SubcategoryDataGridProps, MaterialTabDataGridState> {
    cancelTokenSource: CancelTokenSource;
    static defaultProps: SubcategoryDataGridProps;

    constructor(props: SubcategoryDataGridProps) {
        super(props);
        this.state = {
            materialTabs: null,
            selectedMaterialTab: null,
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
        this.setState({rows: [], loading : true, selectedMaterialTab: null});
        MaterialTab.listFromApi(this.cancelTokenSource, this.props.Id, this.props.notId, this.props.search,
            this.props.withGroup, this.props.withCategory,
            this.props.groupId, this.props.notGroupId,
            this.props.categoryId, this.props.notCategoryId).then((data: any) => {
            this.setState({materialTabs: data});
            this.setState({rows: MaterialTab.getRows(this.state.materialTabs)});
        }).catch((error) => {
            this.setState({materialTabs: null});
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
        if (this.state.materialTabs && this.state.materialTabs !== null && this.state.materialTabs.length > 0) {
            selectedSubcategory = this.state.materialTabs[params.data.AA - 1];
        }
        this.setState({selectedMaterialTab: selectedSubcategory});
        this.props.onRowSelected(selectedSubcategory);
    }

    componentDidUpdate(prevProps: SubcategoryDataGridProps): void {
        if (prevProps.fetchData != this.props.fetchData) {
            this.fetchData();
        }
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={MaterialTab.getColumns()} storagePrefix={this.props.storagePrefix}
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
    onRowSelected(materialTab: MaterialTab): void;
    onFetchData?: () => void;
    storagePrefix: string;
    fetchData: boolean;
    Id?: number;
    notId?: number;
    search?: string;
    withGroup?: boolean;
    withCategory?: boolean;
    groupId?: number;
    notGroupId?: number;
    categoryId?: number;
    notCategoryId?: number;
}

export interface MaterialTabDataGridState {
    materialTabs: MaterialTab[];
    selectedMaterialTab: MaterialTab;
    error: any;
    rows: GridRowsProp;
    loading: boolean;
}

MaterialTabDataGrid.defaultProps = {
    actions: null,
    onRowSelected: null,
    storagePrefix: null,
    fetchData: false,
    Id: null,
    notId: null,
    search: null,
    withGroup: true,
    withCategory: true,
    groupId: null,
    notGroupId: null,
    categoryId: null,
    notCategoryId: null
};