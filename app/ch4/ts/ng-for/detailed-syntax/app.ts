import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  templateUrl: './app.html',
})
class App {
  todos:string[];
  name:string;
  constructor() {
    this.name = "John";
    this.todos = ['Buy milk', "Save the world"];
  }
}

bootstrap(App);
