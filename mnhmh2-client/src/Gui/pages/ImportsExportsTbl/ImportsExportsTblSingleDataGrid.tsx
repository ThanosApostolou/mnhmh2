import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { ImportsExportsTbl } from "../../../entities/ImportsExportsTbl";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { ImportsExportsTblSelectDialog } from "./ImportsExportsTblSelectDialog";

export class ImportsExportsTblSingleDataGrid extends React.Component<ImportsExportsTblSingleDataGridProps, ImportsExportsTblSingleDataGridState> {
    static defaultProps: ImportsExportsTblSingleDataGridProps;

    constructor(props: ImportsExportsTblSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(importsExportsTbl: ImportsExportsTbl): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(importsExportsTbl);
    }

    componentDidMount(): void {
        if (this.props.importsExportsTbl !== null) {
            this.setState({rows: ImportsExportsTbl.getRows([this.props.importsExportsTbl])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: ImportsExportsTblSingleDataGridProps): void {
        if (this.props.importsExportsTbl !== prevProps.importsExportsTbl) {
            if (this.props.importsExportsTbl !== null) {
                this.setState({rows: ImportsExportsTbl.getRows([this.props.importsExportsTbl])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.importsExportsTbl === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={ImportsExportsTbl.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <ImportsExportsTblSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface ImportsExportsTblSingleDataGridProps {
    importsExportsTbl: ImportsExportsTbl;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (importsExportsTbl: ImportsExportsTbl) => void;
}

export interface ImportsExportsTblSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

ImportsExportsTblSingleDataGrid.defaultProps = {
    importsExportsTbl: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};