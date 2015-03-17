var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rust = (function (_super) {
    __extends(Rust, _super);
    function Rust() {
        _super.apply(this, arguments);
        this.data = {};
        this.size = 65;
    }
    Rust.prototype.load = function (url) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            success: function (data) {
                self.loadData(data);
            }
        });
    };
    Rust.prototype.loadData = function (json) {
    };
    Rust.prototype.draw = function (selector) {
    };
    return Rust;
})(EventMixin);
