import React, { ReactNode } from "react";

import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { Group } from "../../../entities/Group";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { GroupSelectDialog } from "./GroupSelectDialog";

export class GroupSingleDataGrid extends React.Component<GroupSingleDataGridProps, GroupSingleDataGridState> {
    static defaultProps: GroupSingleDataGridProps;

    constructor(props: GroupSingleDataGridProps) {
        super(props);
        this.state = {
            rows: [],
            openDialog: false
        };
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onSelectClick(group: Group): void {
        this.setState({openDialog: false});
        this.props.onSelectClick(group);
    }

    componentDidMount(): void {
        if (this.props.group !== null) {
            this.setState({rows: Group.getRows([this.props.group])});
        } else {
            this.setState({rows: []});
        }
    }
    componentDidUpdate(prevProps: GroupSingleDataGridProps): void {
        if (this.props.group !== prevProps.group) {
            if (this.props.group !== null) {
                this.setState({rows: Group.getRows([this.props.group])});
            } else {
                this.setState({rows: []});
            }
        }
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.props.group === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.props.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <MyDataGrid error={null} rows={this.state.rows} loading={false} columns={Group.getColumns()} storagePrefix={this.props.storagePrefix}
                    actions={actions}
                />
                <GroupSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onSelectClick.bind(this)} onCancelClick={() => this.setState({openDialog: false})} />
            </React.Fragment>
        );
    }
}

export interface GroupSingleDataGridProps {
    group: Group;
    storagePrefix: string;
    onRemoveClick: () => void;
    onSelectClick: (group: Group) => void;
}

export interface GroupSingleDataGridState {
    rows: GridRowsProp;
    openDialog: boolean;
}

GroupSingleDataGrid.defaultProps = {
    group: null,
    storagePrefix: null,
    onRemoveClick: null,
    onSelectClick: null
};