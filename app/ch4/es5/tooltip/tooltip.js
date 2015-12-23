var Overlay = ng.Class({
  constructor: function () {
    var el = document.createElement('div');
    el.className = 'tooltip';
    this.el = el;
  },
  close: function () {
    this.el.hidden = true;
  },
  open: function (el, text) {
    this.el.innerHTML = text;
    this.el.hidden = false;
    var rect = el.nativeElement.getBoundingClientRect();
    this.el.style.left = rect.left + 'px';
    this.el.style.top = rect.top + 'px';
  },
  attach: function (target) {
    target.appendChild(this.el);
  },
  detach: function () {
    this.el.parentNode.removeChild(this.el);
  }
});

var OverlayManager = ng.Injectable()
.Class({
  constructor: function () {
    this.pool = {};
  },
  get: function (text) {
    if (this.pool[text]) {
      return this.pool[text].pop();
    }
    var overlay = new Overlay(text);
    overlay.close();
    overlay.attach(document.body);
    return overlay;
  },
  free: function (overlay) {
    var text = overlay.text;
    this.pool[text] = this.pool[text] || [];
    this.pool[text].push(overlay);
    overlay.detach();
  }
});

var Tooltip = ng.Directive({
  selector: '[tooltip]',
  properties: ['tooltip'],
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
.Class({
  constructor: [ng.Inject(ng.ElementRef), ng.Inject(OverlayManager), function (tooltip, el, manager) {
    this.el = el;
    this.overlay = manager.get();
  }],
  onMouseEnter() {
    this.overlay.open(this.el, this.tooltip);
  },
  onMouseLeave() {
    this.overlay.close();
  }
});

var App = ng.Component({
  selector: 'app'
})
.View({
  templateUrl: './app.html',
  directives: [Tooltip]
})
.Class({
  constructor: function () {}
});

ng.bootstrap(App, [OverlayManager]);
