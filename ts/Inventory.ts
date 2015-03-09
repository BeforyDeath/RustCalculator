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
 0: {
 id: ''
 count:
 }}

 kit: {
 id: {
 count:
 stag:
 }}

 */

class Inventory extends EventMixin {
    private data = {};
    private kit = {};
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

    addKit = (e) => {
        var count = 1,
            is_full = false;
        if (e.count > 1) count = e.count;

        if (this.kit[e.id]) {
            count = this.kit[e.id].count + e.count;
            if (this.addInventory(e.id, e.count, count)) {
                this.kit[e.id].count = count;
            } else is_full = true;
        } else {
            if (this.addInventory(e.id, e.count, count)) {
                this.kit[e.id] = {count: e.count, stag: e.stag};
            } else is_full = true;
        }

        if (is_full) {

        }
    };

    addInventory(id, add_count, kit_count) {
        console.log(id, add_count, kit_count);
        //var is_new = true,
        //    is_full = true;
        //
        //for (var slot in this.data) {
        //    if (e.id == this.data[slot].id) {
        //        this.data[slot].count += e.count;
        //        is_new = false;
        //    }
        //}
        //if (is_new) {
        //    for (var slot in this.data) {
        //        if (this.data[slot].count == 0) {
        //            this.data[slot].id = e.id;
        //            this.data[slot].count = e.count;
        //            is_full = false;
        //            break;
        //        }
        //    }
        //}
        return true;
    }

    private onClick = (e) => {
        console.log(e.currentTarget.id);
        console.log(e.currentTarget.value);
    }
}