import React, { ReactNode } from "react";

export class TabPanel extends React.Component<TabPanelProps, any> {
    constructor(props: TabPanelProps) {
        super(props);
    }

    render(): ReactNode {
        if (this.props.value !== this.props.index) {
            return null;
        } else {
            return (
                <div role="tabpanel" hidden={this.props.value !== this.props.index}
                    id={`simple-tabpanel-${this.props.index}`}
                    aria-labelledby={`simple-tab-${this.props.index}`}
                    {...this.props}
                >
                    {this.props.children}
                </div>
            );
        }
    }
}

export interface TabPanelProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function a11yProps(index: number): any {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}