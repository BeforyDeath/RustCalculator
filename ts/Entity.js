/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>
/// <reference path="EventMixin.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 Entity
 -listeners[]
 +load(url?)
 +loadData(json)
 +subscribe(class, event?)
 -onAdd(id, count=1)
 -onRemove(id, count=1)
 +draw()
 -drawUpdate(id)
 */
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        _super.apply(this, arguments);
    }
    Entity.prototype.evtTest = function (e) {
        console.log(e);
    };
    return Entity;
})(EventMixin);
//# sourceMappingURL=Entity.js.map