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
    private onChange(){
        console.log(1);
    }
}