/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>
var Category = (function () {
    function Category() {
        this.data = {};
        this.listeners = [];
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
    Category.prototype.loadData = function (data) {
        var _data = {};
        $.each(data.category, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                id: value,
                name: key
            };
        });
        this.data = _data;
        return this;
    };
    Category.prototype.draw = function (element) {
        var select = $('<select/>', { class: 'rs_select' });
        $.each(this.data, function (key, value) {
            $('<option/>', {
                id: key,
                val: value.id,
                text: value.name
            }).appendTo(select);
        });
        $(select).on('change', this.onChange);
        $(element).append(select);
    };
    Category.prototype.select = function (selected) {
        if (selected === void 0) { selected = 'All'; }
    };
    Category.prototype.onChange = function (e) {
        console.log(e.currentTarget.selectedIndex);
        console.log(e.currentTarget[e.currentTarget.selectedIndex].id);
        console.log(e.currentTarget[e.currentTarget.selectedIndex].label);
        //console.dir(e.currentTarget);
    };
    return Category;
})();
//# sourceMappingURL=Category.js.map