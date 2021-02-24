import App from "../../App";
import React, { ReactNode } from "react";
import { AxiosResponse } from "axios";
import { CircularProgress } from "@material-ui/core";

export class MaterialTabsPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        App.app.apiconsumer.axios.request({
            method: "get",
            url: "/materialtab"
        }).then((response: AxiosResponse<any>) => {
            this.setState({data: response.data});
        }).catch((error) => {
            this.setState({data: null});
        });
    }

    render(): ReactNode {
        return (
            <div>
                <CircularProgress />
                <p>This is MaterialTabsPage page</p>
                <code>{JSON.stringify(this.state.data)}</code>
            </div>
        );
    }
}