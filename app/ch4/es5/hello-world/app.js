var App = ng.core.Component({
  selector: 'app',
  template: '<h1>Hello {{target}}!</h1>'
})
.Class({
  constructor: function () {
    this.target = 'world';
  }
});

// In RC.3 this line should be
// ng.platformBrowserDynamic.bootstrap(App);
ng.platform.browser.bootstrap(App);

