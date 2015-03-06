/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>
/// <reference path="EventMixin.ts"/>

class Category extends EventMixin {
    private data = {};

    load(url?:string) {
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

    loadData(data) {
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

    draw(element:string) {
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

    select(selected:string = 'All') {
    }

    private onChange = (e) => {
        var id = e.currentTarget[e.currentTarget.selectedIndex].id,
            index = e.currentTarget.selectedIndex,
            label = e.currentTarget[e.currentTarget.selectedIndex].label;
        this.trigger('change', {id: id, index: index, label: label});

    }
}