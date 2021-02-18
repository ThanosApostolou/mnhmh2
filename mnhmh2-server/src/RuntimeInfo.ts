export class RuntimeInfo {
    start_datetime = "";
    
    init(): void {
        this.start_datetime = new Date().toISOString();
    }

    toJson() {
        return (
            JSON.stringify({
                start_datetime: this.start_datetime
            })
        );
    }
}