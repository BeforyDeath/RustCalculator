/**
 * Created by beforydeath on 06.03.15.
 */
var EventMixin = (function () {
    function EventMixin() {
        var _this = this;
        this._eventHandlers = [];
        this.on = function (eventName, handler) {
            if (!_this._eventHandlers)
                _this._eventHandlers = [];
            if (!_this._eventHandlers[eventName]) {
                _this._eventHandlers[eventName] = [];
            }
            _this._eventHandlers[eventName].push(handler);
        };
        this.off = function (eventName, handler) {
            var handlers = _this._eventHandlers[eventName];
            if (!handlers)
                return;
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] == handler) {
                    handlers.splice(i--, 1);
                }
            }
        };
        this.trigger = function (eventName) {
            if (!_this._eventHandlers[eventName]) {
                //console.info('eventHandlers no "' + eventName + '" event');
                return;
            }
            var handlers = _this._eventHandlers[eventName];
            for (var i = 0; i < handlers.length; i++) {
                handlers[i].apply(_this, [].slice.call(arguments, 1));
            }
        };
    }
    return EventMixin;
})();
//# sourceMappingURL=EventMixin.js.map