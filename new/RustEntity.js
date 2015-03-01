/// <reference path="RustCalculator.ts"/>
var RustEntity = (function () {
    function RustEntity() {
        this.items = [];
        var entity = this.items;
        $.ajax({
            url: 'entity.json',
            dataType: 'json',
            async: false,
            success: function (data) {
                // key replace
                $.each(data, function (key) {
                    data[key]['name'] = key;
                    var id = key.replace(/ /g, '_');
                    entity[id] = data[key];
                });
            }
        });
        this.items = entity;
    }
    return RustEntity;
})();
//# sourceMappingURL=RustEntity.js.map