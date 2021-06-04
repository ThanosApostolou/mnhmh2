import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Borrower } from "../../../entities/Borrower";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { BorrowerSelectDialog } from "./BorrowerSelectDialog";

export class BorrowerSingleDataGrid extends React.Component<BorrowerSingleDataGridProps, BorrowerSingleDataGridState> {
    static defaultProps: BorrowerSingleDataGridProps;

    constructor(props: BorrowerSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(borrower: Borrower): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(borrower);
    }

    componentDidMount(): void {
        if (this.props.borrower !== null) {
            this.setState({rows: Borrower.getRows([this.props.borrower], true)});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: BorrowerSingleDataGridProps): void {
        if (this.props.borrower !== prevProps.borrower) {
            if (this.props.borrower !== null) {
                this.setState({rows: Borrower.getRows([this.props.borrower], true)});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.borrower === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={Borrower.getColumns(true)} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <BorrowerSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface BorrowerSingleDataGridProps {
    borrower: Borrower;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (borrower: Borrower) => void;
}

export interface BorrowerSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

BorrowerSingleDataGrid.defaultProps = {
    borrower: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};