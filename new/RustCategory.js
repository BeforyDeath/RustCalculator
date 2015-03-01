/// <reference path="RustCalculator.ts"/>
var RustCategory = (function () {
    function RustCategory() {
        this.list = [];
        var category = this.list;
        $.ajax({
            url: 'category.json',
            dataType: 'json',
            async: false,
            success: function (data) {
                category = data;
            }
        });
        this.list = category;
    }
    return RustCategory;
})();
//# sourceMappingURL=RustCategory.js.map