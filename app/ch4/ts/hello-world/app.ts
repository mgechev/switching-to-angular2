import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  templateUrl: './app.html'
})
class App {
  target:string;
  constructor() {
    this.target = 'world';
  }
}

bootstrap(App);

