/// <reference path="../../vendor/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="EventMixin.ts"/>

class Rust extends EventMixin {
    data = {};
    selector:string;
    size:number = 64;

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
    }

    loadData(json) {
    }

    draw(selector:string) {

    }
}