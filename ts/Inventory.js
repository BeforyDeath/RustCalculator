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
 0:
 id: ''
 count: 1
 }
 */
var Inventory = (function (_super) {
    __extends(Inventory, _super);
    function Inventory() {
        var _this = this;
        _super.apply(this, arguments);
        this.data = {};
        this.size = 75;
        this.slot = 36;
        this.addInventory = function (e) {
            var is_new = true, is_full = true;
            for (var slot in _this.data) {
                if (e.id == _this.data[slot].id) {
                    _this.data[slot].count += e.count;
                    is_new = false;
                }
            }
            if (is_new) {
                for (var slot in _this.data) {
                    if (_this.data[slot].count == 0) {
                        _this.data[slot].id = e.id;
                        _this.data[slot].count = e.count;
                        is_full = false;
                        break;
                    }
                }
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
    return Inventory;
})(EventMixin);
//# sourceMappingURL=Inventory.js.map