/// <reference path="Rust.ts"/>
class Entity extends Rust {

    loadData(json) {
        var _data = {};
        $.each(json.entity, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                name: key,
                category_id: value.category_id,
                stag: value.stag
            };
        });
        this.data = _data;
    }

    draw(selector:string) {
        var self = this;
        self.selector = selector;
        $.each(this.data, function (key, value) {
            var entity = $('<button/>', {
                id: key,
                class: 'ei_' + self.size + ' i' + key,
                title: value.name,
                val: value.category_id
            });
            $(entity).on('click', self.onClick);
            $(selector).append(entity);
        });
    }

    categoryChange = (e) => {
        if (e.category_id > 0) {
            $(this.selector + ' button').hide();
            $(this.selector).find('button[value=' + e.category_id + ']').show();
        } else $(this.selector + ' button').show();
    };

    onClick = (e) => {
        var id = e.currentTarget.id,
            category_id = e.currentTarget.value,
            name = e.currentTarget.title,
            stag = this.data[id].stag,
            count = 1;
        this.trigger('click', {id: id, category_id: category_id, name: name, stag: stag, count: count});
    }
}