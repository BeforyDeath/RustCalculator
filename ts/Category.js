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
var Category = (function (_super) {
    __extends(Category, _super);
    function Category() {
        var _this = this;
        _super.apply(this, arguments);
        this.data = {};
        this.onChange = function (e) {
            var id = e.currentTarget[e.currentTarget.selectedIndex].id, index = e.currentTarget.selectedIndex, label = e.currentTarget[e.currentTarget.selectedIndex].label;
            _this.trigger('change', { id: id, index: index, label: label });
        };
    }
    Category.prototype.load = function (url) {
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
    Category.prototype.loadData = function (json) {
        var _data = {};
        $.each(json.category, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                id: value,
                name: key
            };
        });
        this.data = _data;
        return this;
    };
    Category.prototype.getData = function () {
        return this.data;
    };
    Category.prototype.setData = function (data) {
        this.data = data;
    };
    Category.prototype.draw = function (selector) {
        this.selector = selector;
        var select = $('<select/>', { class: 'rs_select' });
        $.each(this.data, function (key, value) {
            $('<option/>', {
                id: key,
                val: value.id,
                text: value.name
            }).appendTo(select);
        });
        $(select).on('change', this.onChange);
        $(selector).append(select);
    };
    Category.prototype.select = function (selected) {
        if (selected === void 0) { selected = 'All'; }
        var select = $(this.selector + ' select');
        if (select.find("option:contains('" + selected + "')").attr('selected', 'selected').length > 0) {
            select.trigger('change');
        }
        else {
        }
    };
    return Category;
})(EventMixin);
//# sourceMappingURL=Category.js.map