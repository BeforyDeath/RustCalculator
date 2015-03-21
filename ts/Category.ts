///<reference path="EventMixin.ts"/>
///<reference path="Records.ts"/>

class Category extends EventMixin {
    selector:string;
    records:Records;

    constructor(records:Records) {
        super();
        this.records = records.getData('category');
    }

    draw = (selector:string) => {
        this.selector = selector;
        var select = $('<select/>').addClass('rs_select');
        $.each(this.records, function (key, value) {
            $('<option/>', {
                id: key,
                val: value.id,
                text: value.name
            }).appendTo(select);
        });
        $(select).on('change', this.onChange);
        $(selector).append(select);
    };

    select = (selected:string = 'All') => {
        var select = $(this.selector + ' select');
        if (select.find("option:contains('" + selected + "')").attr('selected', 'selected').length > 0) {
            select.trigger('change');
        }
    };

    onChange = (e) => {
        var id = e.currentTarget[e.currentTarget.selectedIndex].id,
            category_id = e.currentTarget.selectedIndex,
            name = e.currentTarget[e.currentTarget.selectedIndex].label;
        //console.log('change', {id: id, category_id: category_id, name: name});
        this.trigger('change', {id: id, category_id: category_id, name: name});
    };
}