var App = ng.Component({
  selector: 'app'
})
.View({
  template: '<h1>Hello {{target}}!</h1>'
})
.Class({
  constructor: function () {
    this.target = 'world';
  }
});

ng.bootstrap(App);
