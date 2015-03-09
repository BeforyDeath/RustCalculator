/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var Inventory = (function (_super) {
    __extends(Inventory, _super);
    function Inventory() {
        var _this = this;
        _super.apply(this, arguments);
        this.data = {};
        this.kit = {};
        this.size = 75;
        this.slot = 36;
        this.addKit = function (e) {
            var count = 1, is_full = false;
            if (e.count > 1)
                count = e.count;
            if (_this.kit[e.id]) {
                count = _this.kit[e.id].count + e.count;
                if (_this.addInventory(e.id, e.count, count)) {
                    _this.kit[e.id].count = count;
                }
                else
                    is_full = true;
            }
            else {
                if (_this.addInventory(e.id, e.count, count)) {
                    _this.kit[e.id] = { count: e.count, stag: e.stag };
                }
                else
                    is_full = true;
            }
            if (is_full) {
            }
        };
        this.onClick = function (e) {
            console.log(e.currentTarget.id);
            console.log(e.currentTarget.value);
        };
    }
    Inventory.prototype.draw = function (selector) {
        this.selector = selector;
        for (var i = 0; i < this.slot; i++) {
            this.data[i] = { id: '', count: 0 };
            var entity = $('<button/>', {
                id: 'slot' + i,
                val: i,
                class: 'is_' + this.size
            });
            $(entity).on('click', this.onClick);
            $(selector).append(entity);
        }
    };
    Inventory.prototype.addInventory = function (id, add_count, kit_count) {
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
    };
    return Inventory;
})(EventMixin);
//# sourceMappingURL=Inventory.js.map