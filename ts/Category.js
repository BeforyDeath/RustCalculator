var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Rust.ts"/>
var Category = (function (_super) {
    __extends(Category, _super);
    function Category() {
        var _this = this;
        _super.apply(this, arguments);
        this.onChange = function (e) {
            var id = e.currentTarget[e.currentTarget.selectedIndex].id, category_id = e.currentTarget.selectedIndex, name = e.currentTarget[e.currentTarget.selectedIndex].label;
            _this.trigger('change', { id: id, category_id: category_id, name: name });
        };
    }
    Category.prototype.loadData = function (json) {
        var _data = {};
        $.each(json.category, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                id: value,
                name: key
            };
        });
        this.data = _data;
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
    };
    return Category;
})(Rust);
//# sourceMappingURL=Category.js.map