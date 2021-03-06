/// <reference path="../vendor/DefinitelyTyped/jquery/jquery.d.ts"/>

class Records {
    private _data = {};

    getData = (name:string) => {
        return this._data[name];
    };

    setData = (name:string, data) => {
        this._data[name] = data;
    };

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
            if (json.hasOwnProperty(key)) {
                _data[key] = {};
                for (var value in json[key]) {
                    if (json[key].hasOwnProperty(value)) {
                        var newKey = Records.createKey(value);
                        if (typeof json[key][value] == 'object') {
                            _data[key][newKey] = json[key][value];
                        } else {
                            _data[key][newKey] = {id: json[key][value]};
                        }
                        _data[key][newKey].name = value;
                    }
                }
            }
        }
        this._data = _data;
    };

    static createKey = (name)=> {
        return name.replace(/ -/g, '').replace(/(^[\d.]+)/g, '').trim().replace(/ /g, '_');
    };
}