/// <reference path="RustCalculator.ts"/>

class RustEntity {
    list:string[] = [];

    constructor() {
        var entity = this.list;
        $.ajax({
            url: 'entity.json',
            dataType: 'json',
            async: false,
            success: function (data) {
                // key replace
                $.each(data, function (key) {
                    data[key]['name'] = key;
                    var id = key.replace(/ /g, '_');
                    entity[id] = data[key];
                });
            }
        });
        this.list = entity;
    }
}