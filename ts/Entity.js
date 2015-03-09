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
            if (e.category_id > 0) {
                $(_this.selector + ' button').hide();
                $(_this.selector).find('button[value=' + e.category_id + ']').show();
            }
            else
                $(_this.selector + ' button').show();
        };
        this.onClick = function (e) {
            var id = e.currentTarget.id, category_id = e.currentTarget.value, name = e.currentTarget.title, stag = _this.data[id].stag, count = 1;
            _this.trigger('click', { id: id, category_id: category_id, name: name, stag: stag, count: count });
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
    };
    Entity.prototype.loadData = function (json) {
        var _data = {};
        $.each(json.entity, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                name: key,
                category_id: value.category_id,
                stag: value.stag
            };
        });
        this.data = _data;
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
            $(entity).on('click', self.onClick);
            $(selector).append(entity);
        });
    };
    return Entity;
})(EventMixin);
//# sourceMappingURL=Entity.js.map