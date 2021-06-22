import React, { ReactNode } from "react";
import { CancelTokenSource } from "axios";

import { Group } from "../../../entities/Group";
import { MaterialTab } from "../../../entities/MaterialTab";
import { ApiConsumer } from "../../../ApiConsumer";
import { MaterialTabDataGrid } from "../MaterialTabs/MaterialTabDataGrid";

export class GroupsEditMaterialTabs extends React.Component<GroupsEditMaterialTabsProps, GroupsEditMaterialTabsState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: GroupsEditMaterialTabsProps) {
        super(props);
        this.state = {
            selectedMaterialTab: null,
            fetchData: false,
            openDialog: false
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
                <MaterialTabDataGrid actions={null} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="groups_materialtabs" fetchData={this.state.fetchData}
                    groupId={this.props.group.Id}
                    onFetchData={this.onFetchData.bind(this)}
                />
            </React.Fragment>
        );
    }
}

export interface GroupsEditMaterialTabsProps {
    group: Group;
}

export interface GroupsEditMaterialTabsState {
    selectedMaterialTab: MaterialTab;
    fetchData: boolean;
    openDialog: boolean;
}
