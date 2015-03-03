/// <reference path="RustCalculator.ts"/>

class RustCategory {
    items:string[] = [];

    constructor() {
        this.items = this.getItems();
    }

    public getItems() {
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
    }

    public drawSelect(element, selected = 'All') {
        var select = $('<select/>', {class: 'rs_select'});
        $.each(this.items, function (key, value) {
            $('<option/>', {
                val: key,
                text: value,
                selected: (value == selected) ? true : false
            }).appendTo(select);
        });
        $(select).on('change', this.onChange);
        $(element).append(select);
    }

    public js_drawSelect(element, selected = 'All') {
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
    }


    private onChange() {
        console.log(1);
    }
}