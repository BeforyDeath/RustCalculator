/**
 * Created by beforydeath on 06.03.15.
 */
/// <reference path="Rust.ts"/>

class EventMixin {

    /**
     * Подписка на событие
     * Использование:
     *  menu.on('select', function(item) { ... }
     */
    on = (eventName, handler) => {
        if (!this._eventHandlers) this._eventHandlers = [];
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    };

    /**
     * Прекращение подписки
     *  menu.off('select',  handler)
     */
    off = (eventName, handler) => {
        var handlers = this._eventHandlers[eventName];
        if (!handlers) return;
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i] == handler) {
                handlers.splice(i--, 1);
            }
        }
    };

    /**
     * Генерация события с передачей данных
     *  this.trigger('select', item);
     */
    trigger = (eventName) => {
        if (!this._eventHandlers[eventName]) {
            return; // обработчиков для события нет
        }
        // вызвать обработчики
        var handlers = this._eventHandlers[eventName];
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(this, [].slice.call(arguments, 1));
        }
    };
}
