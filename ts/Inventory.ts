/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>

/*
draw
load
sort

draw kit



 */

class Inventory extends EventMixin {
    public slot:number = 36;
    public size:number = 65;
    private data = {};
    private selector:string;

    load(url:string) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            success: function (data) {
                self.loadData(data);
            }
        });
    }

    private loadData(json) {
        var _data = {};
        this.slot = json.inventory.countSlot;
        $.each(json.inventory.slot, function (key, value) {
            _data[key] = {
                id: value.entity.replace(/ /g, '_'),
                name: value.entity,
                count: value.count
            };
        });
        this.data = _data;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    draw(selector:string) {
        var self = this;
        self.selector = selector;
        for (var i = 0; i < this.slot; i++) {
            var entity = $('<button/>', {
                id: 'slot' + i,
                class: 'ei_'+this.size
            });
            //$(entity).on('click', self.onClick);
            $(selector).append(entity);
        }
    }
}