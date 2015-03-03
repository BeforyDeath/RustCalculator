/// <reference path="RustCalculator.ts"/>
var RustCategory = (function () {
    function RustCategory() {
        this.items = [];
        this.items = this.getItems();
    }
    RustCategory.prototype.getItems = function () {
        var category = this.items;
        $.ajax({
            url: 'category.json',
            dataType: 'json',
            async: false,
            success: function (data) {
                category = data;
            }
        });
        return category;
    };
    RustCategory.prototype.drawSelect = function (element, selected) {
        if (selected === void 0) { selected = 'All'; }
        var select = $('<select/>', { class: 'rs_select' });
        $.each(this.items, function (key, value) {
            $('<option/>', {
                val: key,
                text: value,
                selected: (value == selected) ? true : false
            }).appendTo(select);
        });
        $(select).on('change', this.onChange);
        $(element).append(select);
    };
    RustCategory.prototype.js_drawSelect = function (element, selected) {
        if (selected === void 0) { selected = 'All'; }
        element = document.getElementById(element);
        var select = document.createElement('select');
        select.className = 'rs_select';
        for (var key in this.items) {
            var option = document.createElement('option');
            option.selected = (this.items[key] == selected) ? true : false;
            option.value = key;
            option.innerHTML = this.items[key];
            select.appendChild(option);
        }
        element.appendChild(select);
    };
    RustCategory.prototype.onChange = function () {
        console.log(1);
    };
    return RustCategory;
})();
//# sourceMappingURL=RustCategory.js.map