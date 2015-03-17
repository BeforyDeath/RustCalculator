var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Inventory = (function (_super) {
    __extends(Inventory, _super);
    function Inventory() {
        _super.apply(this, arguments);
        this.slot = 36;
        this.onClick = function (e) {
            console.log(e.currentTarget.id);
            console.log(e.currentTarget.value);
        };
    }
    Inventory.prototype.draw = function (selector) {
        this.selector = selector;
        for (var i = 0; i < this.slot; i++) {
            this.data[i] = { id: '', count: 0 };
            var entity = $('<button/>', {
                id: 'slot' + i,
                val: i,
                class: 'is_' + this.size
            });
            $(entity).on('click', this.onClick);
            $(selector).append(entity);
        }
    };
    return Inventory;
})(Rust);
