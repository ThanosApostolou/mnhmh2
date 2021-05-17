const fs = require("fs");

export class Config {
    port = 3000;
    dbuser = "test";
    dbpassword = "test";
    dbserver = "DESKTOP-RO1RABI\\SQLEXPRESS";
    database = "MNHMH";

    readFromFile(): void {
        try {
            const configfile = fs.readFileSync("./config.json");
            const configobj = JSON.parse(configfile);
            this.port = configobj.port;
            this.dbuser = configobj.dbuser;
            this.dbpassword = configobj.dbpassword;
            this.dbserver = configobj.dbserver;
            this.database = configobj.database;
        } catch (e) {
            console.log("error reading config", e);
        }
    }
}