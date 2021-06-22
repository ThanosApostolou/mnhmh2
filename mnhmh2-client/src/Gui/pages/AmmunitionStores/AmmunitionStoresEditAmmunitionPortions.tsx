import React, { ReactNode } from "react";
import { CancelTokenSource } from "axios";

import { AmmunitionStore } from "../../../entities/AmmunitionStore";
import { AmmunitionPortion } from "../../../entities/AmmunitionPortion";
import { ApiConsumer } from "../../../ApiConsumer";
import { AmmunitionPortionDataGrid } from "../AmmunitionPortions/AmmunitionPortionDataGrid";

export class AmmunitionStoresEditAmmunitionPortions extends React.Component<AmmunitionStoresEditAmmunitionPortionsProps, AmmunitionStoresEditAmmunitionPortionsState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: AmmunitionStoresEditAmmunitionPortionsProps) {
        super(props);
        this.state = {
            selectedAmmunitionPortion: null,
            fetchData: false
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    fetchData(): void {
        this.setState({fetchData: !this.state.fetchData});
    }

    onFetchData(): void {
        this.setState({selectedAmmunitionPortion: null});
    }

    onRowSelected(ammunitionPortion: AmmunitionPortion): void {
        this.setState({selectedAmmunitionPortion: ammunitionPortion});
    }

    render(): ReactNode {
        return (
            <React.Fragment>
                <AmmunitionPortionDataGrid actions={null} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="ammunitionstores_ammunitionportions" fetchData={this.state.fetchData}
                    ammunitionStoreId={this.props.ammunitionStore.Id}
                    onFetchData={this.onFetchData.bind(this)}
                />
            </React.Fragment>
        );
    }
}

export interface AmmunitionStoresEditAmmunitionPortionsProps {
    ammunitionStore: AmmunitionStore;
}

export interface AmmunitionStoresEditAmmunitionPortionsState {
    selectedAmmunitionPortion: AmmunitionPortion;
    fetchData: boolean;
}
