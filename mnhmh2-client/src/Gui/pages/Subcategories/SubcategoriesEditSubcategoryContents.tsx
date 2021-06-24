import React, { ReactNode } from "react";
import { CancelTokenSource } from "axios";

import { Subcategory } from "../../../entities/Subcategory";
import { SubcategoryContent } from "../../../entities/SubcategoryContent";
import { ApiConsumer } from "../../../ApiConsumer";
import { SubcategoryContentDataGrid } from "../SubcategoryContents/SubcategoryContentDataGrid";

export class SubcategoriesEditSubcategoryContents extends React.Component<SubcategoriesEditSubcategoryContentsProps, SubcategoriesEditSubcategoryContentsState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: SubcategoriesEditSubcategoryContentsProps) {
        super(props);
        this.state = {
            selectedSubcategoryContent: null,
            fetchData: false
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    fetchData(): void {
        this.setState({fetchData: !this.state.fetchData});
    }

    onFetchData(): void {
        this.setState({selectedSubcategoryContent: null});
    }

    onRowSelected(subcategoryContent: SubcategoryContent): void {
        this.setState({selectedSubcategoryContent: subcategoryContent});
    }

    render(): ReactNode {
        return (
            <React.Fragment>
                <SubcategoryContentDataGrid actions={null} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="subcategories_subcategorycontents" fetchData={this.state.fetchData}
                    subcategoryBelongingToId={this.props.subcategory.Id}
                    onFetchData={this.onFetchData.bind(this)}
                />
            </React.Fragment>
        );
    }
}

export interface SubcategoriesEditSubcategoryContentsProps {
    subcategory: Subcategory;
}

export interface SubcategoriesEditSubcategoryContentsState {
    selectedSubcategoryContent: SubcategoryContent;
    fetchData: boolean;
}
