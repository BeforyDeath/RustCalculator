/// <reference path="RustCalculator.ts"/>

class RustCategory {
    list:string[] = [];

    constructor() {
        var category = this.list;
        $.ajax({
            url: 'category.json',
            dataType: 'json',
            async: false,
            success: function (data) {
                category = data;
            }
        });
        this.list = category;
    }
}