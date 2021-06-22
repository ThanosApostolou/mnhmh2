import React, { ReactNode } from "react";
import { CancelTokenSource } from "axios";

import { Borrower } from "../../../entities/Borrower";
import { Subcategory } from "../../../entities/Subcategory";
import { ApiConsumer } from "../../../ApiConsumer";
import { SubcategoryDataGrid } from "../Subcategories/SubcategoryDataGrid";

export class BorrowersEditSubcategories extends React.Component<BorrowersEditSubcategoriesProps, BorrowersEditSubcategoriesState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: BorrowersEditSubcategoriesProps) {
        super(props);
        this.state = {
            selectedSubcategory: null,
            fetchData: false
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    fetchData(): void {
        this.setState({fetchData: !this.state.fetchData});
    }

    onFetchData(): void {
        this.setState({selectedSubcategory: null});
    }

    onRowSelected(subcategory: Subcategory): void {
        this.setState({selectedSubcategory: subcategory});
    }

    render(): ReactNode {
        return (
            <React.Fragment>
                <SubcategoryDataGrid actions={null} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="borrowers_subcategories" fetchData={this.state.fetchData}
                    borrowerId={this.props.borrower.Id}
                    onFetchData={this.onFetchData.bind(this)}
                />
            </React.Fragment>
        );
    }
}

export interface BorrowersEditSubcategoriesProps {
    borrower: Borrower;
}

export interface BorrowersEditSubcategoriesState {
    selectedSubcategory: Subcategory;
    fetchData: boolean;
}
