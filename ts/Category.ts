/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>

class Category {
    private data = {};
    private listeners:string[] = [];

    load(url?:string){
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
    }

    loadData(data){
        var _data = {};
        $.each(data.category, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                id: value,
                name: key
            };
        });
        this.data = _data;
        return this;
    }

    draw(element:string){
        var select = $('<select/>', {class: 'rs_select'});
        $.each(this.data, function (key, value) {
            $('<option/>', {
                id: key,
                val: value.id,
                text: value.name
            }).appendTo(select);
        });
        $(select).on('change', this.onChange);
        $(element).append(select);
    }

    select(selected:string = 'All'){
    }

    private onChange(e){
        console.log(e.currentTarget.selectedIndex);
        console.log(e.currentTarget[e.currentTarget.selectedIndex].id);
        console.log(e.currentTarget[e.currentTarget.selectedIndex].label);
        //console.dir(e.currentTarget);
    }
}