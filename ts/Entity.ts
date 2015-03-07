/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>

/*
 Entity
 -onAdd(id, count=1)
 -onRemove(id, count=1)
 +draw()
 -drawUpdate(id)
 categoryChange(category)
 */
class Entity extends EventMixin {
    private data = {};
    private selector:string;
    private size:number = 65;

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
        $.each(json.entity, function (key, value) {
            _data[key.replace(/ /g, '_')] = {
                name: key,
                category_id: value.category_id,
                slot: value.slot
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

    draw(selector:string) {
        this.selector = selector;

        $.each(this.data, function (key, value) {
            var entity = $('<div/>', {id: key, class: 'entity', title: value.name});

            $(selector).append(entity);
        });
    }

    categoryChange = (e) => {
        //console.info(this.selector);
        //console.log(e);
    }
}