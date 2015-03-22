///<reference path="EventMixin.ts"/>
///<reference path="Records.ts"/>

class Kits {
    selector:string;
    records:Records;

    constructor(records:Records) {
        //super();
        this.records = records.getData('kits');
    }

}
