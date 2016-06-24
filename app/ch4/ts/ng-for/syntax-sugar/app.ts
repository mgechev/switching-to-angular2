import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  templateUrl: './app.html'
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
