/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>
/*
 Inventory
 -listeners[]
 +load(url?)
 +loadData(json)
 +save(url?)
 +getData()
 -addEntity(id, count)
 -removeEntity(id, count, slot?)
 +subscribe(class, event?)
 +sort(desc?)
 +clear()
 //-onAdd(id, count)
 //-onRemove(id, count)
 -onClick(id, countEntityInSlot)
 -onClear()
 +draw()
 -drawUpdate(id)
 */
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
    }
    return Inventory;
})(EventMixin);
//# sourceMappingURL=Inventory.js.map