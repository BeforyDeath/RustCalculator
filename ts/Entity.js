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
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        var _this = this;
        _super.apply(this, arguments);
        this.data = {};
        this.size = 65;
        this.categoryChange = function (e) {
            $(_this.selector + ' button').hide();
            $(_this.selector).find('button[value=' + e.index + ']').show();
            //console.info(this.selector);
            //console.log(e);
        };
    }
    Entity.prototype.load = function (url) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            success: function (data) {
                self.loadData(data);
            }
        });
        return this;
    };
    Entity.prototype.loadData = function (json) {
        var _data = {};
        $.each(json.entity, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                name: key,
                category_id: value.category_id,
                slot: value.slot
            };
        });
        this.data = _data;
        return this;
    };
    Entity.prototype.getData = function () {
        return this.data;
    };
    Entity.prototype.setData = function (data) {
        this.data = data;
    };
    Entity.prototype.draw = function (selector) {
        var self = this;
        self.selector = selector;
        $.each(this.data, function (key, value) {
            var entity = $('<button/>', {
                id: key,
                class: 'ei_' + self.size + ' i' + key,
                title: value.name,
                val: value.category_id
            });
            $(selector).append(entity);
        });
    };
    return Entity;
})(EventMixin);
//# sourceMappingURL=Entity.js.map