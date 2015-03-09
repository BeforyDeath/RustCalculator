/// <reference path="Rust.ts"/>
class Category extends Rust {

    loadData(json) {
        var _data = {};
        $.each(json.category, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                id: value,
                name: key
            };
        });
        this.data = _data;
    }

    draw(selector:string) {
        this.selector = selector;
        var select = $('<select/>', {class: 'rs_select'});
        $.each(this.data, function (key, value) {
            $('<option/>', {
                id: key,
                val: value.id,
                text: value.name
            }).appendTo(select);
        });
        $(select).on('change', this.onChange);
        $(selector).append(select);
    }

    select(selected:string = 'All') {
        var select = $(this.selector + ' select');
        if (select.find("option:contains('" + selected + "')").attr('selected', 'selected').length > 0) {
            select.trigger('change');
        }
    }

    onChange = (e) => {
        var id = e.currentTarget[e.currentTarget.selectedIndex].id,
            category_id = e.currentTarget.selectedIndex,
            name = e.currentTarget[e.currentTarget.selectedIndex].label;
        this.trigger('change', {id: id, category_id: category_id, name: name});
    }
}