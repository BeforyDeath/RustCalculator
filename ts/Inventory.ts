///<reference path="EventMixin.ts"/>
///<reference path="Records.ts"/>
///<reference path="Kits.ts"/>

class Inventory extends EventMixin {
    selector:string;
    slot:number = 40;
    size:number = 64;
    kits:Kits;

    constructor(kits:Kits) {
        super();
        this.kits = kits;
    }

    draw(selector:string) {
        this.selector = selector;
        for (var i = 0; i < this.slot; i++) {
            //this.data[i] = {id: '', count: 0};
            var entity = $('<button/>', {
                id: 'slot' + i,
                val: i
            }).addClass('rc_' + this.size + ' None');
            $(entity).on('click', this.onClick);
            $(selector).append(entity);
        }
    }

    onClick = (e) => {
        console.log(e.currentTarget.id);
        console.log(e.currentTarget.value);
    }
}