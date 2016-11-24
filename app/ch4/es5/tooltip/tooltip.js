var Overlay = ng.core.Class({
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

var Tooltip = ng.core.Directive({
  selector: '[tooltip]',
  inputs: ['tooltip'],
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
.Class({
  constructor: [ng.core.ElementRef, Overlay, function (el, overlay) {
    this.el = el;
    this.overlay = overlay;
    overlay.attach(this.el.nativeElement);
  }],
  onMouseEnter() {
    this.overlay.open(this.el, this.tooltip);
  },
  onMouseLeave() {
    this.overlay.close();
  }
});

var App = ng.core.Component({
  selector: 'app',
  templateUrl: './app.html',
})
.Class({
  constructor: function () {}
});

var AppModule = ng.core.NgModule({
  imports: [ng.platformBrowser.BrowserModule],
  declarations: [App, Tooltip],
  providers: [Overlay],
  bootstrap: [App]
})
.Class({
  constructor: function () {}
});

ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);

