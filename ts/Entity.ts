/**
 * Created by beforydeath on 05.03.15.
 */
/// <reference path="Rust.ts"/>

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
class Entity extends EventMixin {
    nameEntity = '';

    evtTest = (e) => {
        console.info(this.nameEntity);
        console.log(e);
    }
}