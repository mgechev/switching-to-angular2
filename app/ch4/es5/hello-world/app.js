var AppComponent = ng.core.Component({
  selector: 'my-app',
  template: '<h1>Hello {{target}}!</h1>'
})
.Class({
  constructor: function () {
    this.target = 'world';
  }
});

var AppModule = ng.core.NgModule({
  imports: [ng.platformBrowser.BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
.Class({
  constructor: function () {}
});

ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);

