var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var Overlay = (function () {
    function Overlay(text) {
        var el = document.createElement('div');
        el.className = 'tooltip';
        el.innerHTML = text;
        this.el = el;
    }
    Overlay.prototype.close = function () {
        this.el.hidden = true;
    };
    Overlay.prototype.open = function (el) {
        this.el.hidden = false;
        var rect = el.getBoundingClientRect();
        this.el.style.left = rect.left + 'px';
        this.el.style.top = rect.top + 'px';
    };
    Overlay.prototype.attach = function (target) {
        target.appendChild(this.el);
    };
    Overlay.prototype.detach = function () {
        this.el.parentNode.removeChild(this.el);
    };
    return Overlay;
})();
var OverlayManager = (function () {
    function OverlayManager() {
        this.pool = {};
    }
    OverlayManager.prototype.get = function (text) {
        if (this.pool[text]) {
            return this.pool[text].pop();
        }
        var overlay = new Overlay(text);
        overlay.close();
        overlay.attach(document.body);
        return overlay;
    };
    OverlayManager.prototype.free = function (overlay) {
        var text = overlay.text;
        this.pool[text] = this.pool[text] || [];
        this.pool[text].push(overlay);
        overlay.detach();
    };
    OverlayManager = __decorate([
        angular2_1.Injectable()
    ], OverlayManager);
    return OverlayManager;
})();
var Tooltip = (function () {
    function Tooltip(tooltip, el, manager) {
        this.el = el;
        this.el = el;
        this.overlay = manager.get(tooltip);
    }
    Tooltip.prototype.onMouseEnter = function () {
        this.overlay.open(this.el.nativeElement);
    };
    Tooltip.prototype.onMouseLeave = function () {
        this.overlay.close();
    };
    Tooltip = __decorate([
        angular2_1.Directive({
            selector: '[tooltip]',
            properties: ['tooltip'],
            host: {
                '(mouseenter)': 'onMouseEnter()',
                '(mouseleave)': 'onMouseLeave()'
            }
        }),
        __param(0, angular2_1.Attribute('tooltip'))
    ], Tooltip);
    return Tooltip;
})();
exports.Tooltip = Tooltip;
var App = (function () {
    function App() {
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        angular2_1.View({
            templateUrl: './app.html',
            directives: [Tooltip]
        })
    ], App);
    return App;
})();
angular2_1.bootstrap(App, [OverlayManager]);
