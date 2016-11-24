var App = ng.core.Component({
  selector: 'app',
  template: '<h1>Hello {{target}}!</h1>'
})
.Class({
  constructor: function () {
    this.target = 'world';
  }
});

var AppModule = ng.core.NgModule({
  imports: [ng.platformBrowser.BrowserModule],
  declarations: [App],
  bootstrap: [App]
})
.Class({
  constructor: function () {}
});

ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);

