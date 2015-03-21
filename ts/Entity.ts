///<reference path="EventMixin.ts"/>
///<reference path="Records.ts"/>

class Entity extends EventMixin {
    selector:string;
    size:number;
    records:Records;

    constructor(records:Records, size:number = 64) {
        super();
        this.size = size;
        this.records = records.getData('entity');
    }

    draw = (selector:string) => {
        this.selector = selector;
        var self = this;
        $.each(this.records, function (key, value) {
            var entity = $('<button/>', {
                id: key,
                title: value.name,
                val: value.category_id
            }).addClass('rc_' + self.size + ' ' + key);
            $(entity).on('click', self.onClick);
            $(selector).append(entity);
        });
    };

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
            stag = this.records[id].stag,
            count = 1;
        console.log('click', {id: id, category_id: category_id, name: name, stag: stag, count: count});
        this.trigger('click', {id: id, category_id: category_id, name: name, stag: stag, count: count});
    };
}