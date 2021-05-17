import { Config } from "./Config";
import { DBManager } from "./DBManager";
import { RuntimeInfo } from "./RuntimeInfo";
import { Webserver } from "./Webserver";
export class App {
    static app: App = null;
    config: Config = null;
    runtimeinfo: RuntimeInfo = null;
    webserver: Webserver = null;
    dbmanager: DBManager = null;

    init(): void {
        App.app = this;
        this.config = new Config();
        this.config.readFromFile();
        this.runtimeinfo = new RuntimeInfo();
        this.runtimeinfo.init();
        this.webserver = new Webserver();
        this.webserver.init(this.config.port);
        this.dbmanager = new DBManager();
        this.dbmanager.init(this.config.dbuser, this.config.dbpassword, this.config.dbserver, this.config.database);
    }

}