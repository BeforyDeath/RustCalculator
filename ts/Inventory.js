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
draw
load
sort

draw kit



 */
var Inventory = (function (_super) {
    __extends(Inventory, _super);
    function Inventory() {
        _super.apply(this, arguments);
        this.slot = 36;
        this.size = 65;
        this.data = {};
    }
    Inventory.prototype.load = function (url) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            success: function (data) {
                self.loadData(data);
            }
        });
    };
    Inventory.prototype.loadData = function (json) {
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
    };
    Inventory.prototype.getData = function () {
        return this.data;
    };
    Inventory.prototype.setData = function (data) {
        this.data = data;
    };
    Inventory.prototype.draw = function (selector) {
        var self = this;
        self.selector = selector;
        for (var i = 0; i < this.slot; i++) {
            var entity = $('<button/>', {
                id: 'slot' + i,
                class: 'ei_' + this.size
            });
            //$(entity).on('click', self.onClick);
            $(selector).append(entity);
        }
    };
    return Inventory;
})(EventMixin);
//# sourceMappingURL=Inventory.js.map