/// <reference path="../../vendor/DefinitelyTyped/jquery/jquery.d.ts"/>

class Records {
    private _data = {};

    getData(name) {
        return this._data[name];
    }

    load = (url:string) => {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            success: function (data) {
                // validate data
                self.loadData(data);
            }
        });
    };

    private loadData = (json) => {
        var _data = {};
        for (var key in json) {
            _data[key] = {};
            for (var value in json[key]) {
                var newKey = this.createKey(value);
                if (typeof json[key][value] == 'object') {
                    _data[key][newKey] = json[key][value];
                } else {
                    _data[key][newKey] = {id: json[key][value]};
                }
                _data[key][newKey].name = value;
            }
        }
        this._data = _data;
    };

    createKey = (name) => {
        return name.replace(/ -/g, '').replace(/(^[\d.]+)/g, '').trim().replace(/ /g, '_');
    }
}