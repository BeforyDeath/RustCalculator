///<reference path="EventMixin.ts"/>
///<reference path="Records.ts"/>

class Kits {
    selector:string;
    size:number;
    records:Records;

    constructor(records:Records, size:number = 64) {
        //super();
        this.size = size;
        this.records = records.getData('kits');
    }

}
