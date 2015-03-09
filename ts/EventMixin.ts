/**
 * Created by beforydeath on 06.03.15.
 */

class EventMixin {
    private _eventHandlers = [];
    on = (eventName, handler) => {
        if (!this._eventHandlers) this._eventHandlers = [];
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    };
    off = (eventName, handler) => {
        var handlers = this._eventHandlers[eventName];
        if (!handlers) return;
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i] == handler) {
                handlers.splice(i--, 1);
            }
        }
    };
    trigger = (eventName) => {
        if (!this._eventHandlers[eventName]) {
            //console.info('eventHandlers no "' + eventName + '" event');
            return;
        }
        var handlers = this._eventHandlers[eventName];
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(this, [].slice.call(arguments, 1));
        }
    };
}
