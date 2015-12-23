import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'app'
})
@View({
  templateUrl: '<%= currentPath %>app.html'
})
class App {
  target:string;
  constructor() {
    this.target = 'world';
  }
}

bootstrap(App);

