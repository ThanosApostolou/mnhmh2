import React, { ReactNode } from "react";
import { CancelTokenSource } from "axios";

import { ApiConsumer } from "../../../ApiConsumer";
import { Category } from "../../../entities/Category";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabDataGrid } from "../MaterialTabs/MaterialTabDataGrid";

export class CategoriesEditMaterialTabs extends React.Component<CategoriesEditMaterialTabsProps, CategoriesEditMaterialTabsState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: CategoriesEditMaterialTabsProps) {
        super(props);
        this.state = {
            selectedMaterialTab: null,
            fetchData: false
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    fetchData(): void {
        this.setState({fetchData: !this.state.fetchData});
    }

    onFetchData(): void {
        this.setState({selectedMaterialTab: null});
    }

    onRowSelected(materialTab: MaterialTab): void {
        this.setState({selectedMaterialTab: materialTab});
    }

    render(): ReactNode {
        return (
            <React.Fragment>
                <MaterialTabDataGrid actions={null} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="categories_materialtabs" fetchData={this.state.fetchData}
                    categoryId={this.props.category.Id}
                    onFetchData={this.onFetchData.bind(this)}
                />
            </React.Fragment>
        );
    }
}

export interface CategoriesEditMaterialTabsProps {
    category: Category;
}

export interface CategoriesEditMaterialTabsState {
    selectedMaterialTab: MaterialTab;
    fetchData: boolean;
}
