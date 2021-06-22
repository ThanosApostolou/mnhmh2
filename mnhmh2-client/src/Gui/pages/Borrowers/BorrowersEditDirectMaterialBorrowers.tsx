import React, { ReactNode } from "react";
import { CancelTokenSource } from "axios";

import { Borrower } from "../../../entities/Borrower";
import { DirectMaterialBorrower } from "../../../entities/DirectMaterialBorrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { DirectMaterialBorrowerDataGrid } from "../DirectMaterialBorrowers/DirectMaterialBorrowerDataGrid";

export class BorrowersEditDirectMaterialBorrowers extends React.Component<BorrowersEditDirectMaterialBorrowersProps, BorrowersEditDirectMaterialBorrowersState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: BorrowersEditDirectMaterialBorrowersProps) {
        super(props);
        this.state = {
            selectedDirectMaterialBorrower: null,
            fetchData: false
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    fetchData(): void {
        this.setState({fetchData: !this.state.fetchData});
    }

    onFetchData(): void {
        this.setState({selectedDirectMaterialBorrower: null});
    }

    onRowSelected(directMaterialBorrower: DirectMaterialBorrower): void {
        this.setState({selectedDirectMaterialBorrower: directMaterialBorrower});
    }

    render(): ReactNode {
        return (
            <React.Fragment>
                <DirectMaterialBorrowerDataGrid actions={null} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="borrowers_directmaterialborrowers" fetchData={this.state.fetchData}
                    borrowerId={this.props.borrower.Id}
                    onFetchData={this.onFetchData.bind(this)}
                />
            </React.Fragment>
        );
    }
}

export interface BorrowersEditDirectMaterialBorrowersProps {
    borrower: Borrower;
}

export interface BorrowersEditDirectMaterialBorrowersState {
    selectedDirectMaterialBorrower: DirectMaterialBorrower;
    fetchData: boolean;
}
