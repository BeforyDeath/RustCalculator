/// <reference path="Rust.ts"/>
class Inventory extends Rust {
    public slot:number = 40;

    draw(selector:string) {
        this.selector = selector;
        for (var i = 0; i < this.slot; i++) {
            this.data[i] = {id: '', count: 0};
            var entity = $('<button/>', {
                id: 'slot' + i,
                val: i,
                class: 'rc_' + this.size + ' None'
            });
            $(entity).on('click', this.onClick);
            $(selector).append(entity);
        }
    }

    onClick = (e) => {
        console.log(e.currentTarget.id);
        console.log(e.currentTarget.value);
    }
}