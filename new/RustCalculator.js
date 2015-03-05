/// <reference path="../vendor/DefinitelyTyped/jquery/jquery.d.ts"/>
/*

config
 default router url
  read:
  save:

Category
 -listeners[]
 +load(url?)
 +loadData(json)
 -onChange(id)
 +draw()

Entity
 -listeners[]
 +load(url?)
 +loadData(json)
 +subscribe(class, event?)
 -onAdd(id, count=1)
 -onRemove(id, count=1)
 +draw()
 -drawUpdate(id)

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
var RustCalculator = (function () {
    function RustCalculator() {
    }
    return RustCalculator;
})();
//# sourceMappingURL=RustCalculator.js.map