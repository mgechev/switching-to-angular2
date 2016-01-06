import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'app',
  templateUrl: '<%= currentPath %>app.html'
})
class App {
  todos:string[];
  name:string;
  handle() {
    alert(42);
  }
  constructor() {
    this.name = "John";
    this.todos = ['Buy milk', "Save the world"];
  }
}

bootstrap(App);
