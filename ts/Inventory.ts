/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>

/*
 inventory
 draw
 sort

 kit
 draw
 load
 save

 data: {
 0:
 id: ''
 count: 1
 }
 */

class Inventory extends EventMixin {
    private data = {};
    private selector:string;
    public size:number = 75;
    public slot:number = 36;

    draw(selector:string) {
        this.selector = selector;
        for (var i = 0; i < this.slot; i++) {
            this.data[i] = {id: '', count: 0};
            var entity = $('<button/>', {
                id: 'slot' + i,
                val: i,
                class: 'is_' + this.size
            });
            $(entity).on('click', this.onClick);
            $(selector).append(entity);
        }
    }

    addInventory = (e) => {
        var is_new = true,
            is_full = true;

        for (var slot in this.data) {
            if (e.id == this.data[slot].id) {
                this.data[slot].count += e.count;
                is_new = false;
            }
        }
        if (is_new) {
            for (var slot in this.data) {
                if (this.data[slot].count == 0) {
                    this.data[slot].id = e.id;
                    this.data[slot].count = e.count;
                    is_full = false;
                    break;
                }
            }
        }
    };

    private onClick = (e) => {
        console.log(e.currentTarget.id);
        console.log(e.currentTarget.value);
    }
}