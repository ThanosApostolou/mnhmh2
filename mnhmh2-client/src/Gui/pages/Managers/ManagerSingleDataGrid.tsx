import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Manager } from "../../../entities/Manager";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { ManagerSelectDialog } from "./ManagerSelectDialog";

export class ManagerSingleDataGrid extends React.Component<ManagerSingleDataGridProps, ManagerSingleDataGridState> {
    static defaultProps: ManagerSingleDataGridProps;

    constructor(props: ManagerSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(manager: Manager): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(manager);
    }

    componentDidMount(): void {
        if (this.props.manager !== null) {
            this.setState({rows: Manager.getRows([this.props.manager])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: ManagerSingleDataGridProps): void {
        if (this.props.manager !== prevProps.manager) {
            if (this.props.manager !== null) {
                this.setState({rows: Manager.getRows([this.props.manager])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.manager === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={Manager.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <ManagerSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface ManagerSingleDataGridProps {
    manager: Manager;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (manager: Manager) => void;
}

export interface ManagerSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

ManagerSingleDataGrid.defaultProps = {
    manager: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};