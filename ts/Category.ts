/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>

class Category extends EventMixin {
    private data = {};
    private element_id:string;

    load(url:string) {
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

    loadData(json) {
        var _data = {};
        $.each(json.category, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                id: value,
                name: key
            };
        });
        this.data = _data;
        return this;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    draw(element:string) {
        this.element_id = element;
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
        var select = $(this.element_id + ' select');
        if (select.find("option:contains('" + selected + "')").attr('selected', 'selected').length > 0) {
            select.trigger('change');
        } else {
            //console.info('no options selected "' + selected + '"');
        }
    }

    private onChange = (e) => {
        var id = e.currentTarget[e.currentTarget.selectedIndex].id,
            index = e.currentTarget.selectedIndex,
            label = e.currentTarget[e.currentTarget.selectedIndex].label;
        this.trigger('change', {id: id, index: index, label: label});
    }
}