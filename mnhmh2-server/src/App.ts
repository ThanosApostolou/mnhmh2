import { RuntimeInfo } from "./RuntimeInfo";
import { Webserver } from "./Webserver";

export class App {
    static app: App = null;
    runtimeinfo: RuntimeInfo = null;
    webserver: Webserver = null;

    init(): void {
        App.app = this;
        this.runtimeinfo = new RuntimeInfo();
        this.runtimeinfo.init();
        this.webserver = new Webserver();
        this.webserver.init();
    }

}