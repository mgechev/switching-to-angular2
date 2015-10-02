import {Component, View, bootstrap} from 'angular2/angular2';
@Component({
  selector: 'app'
})
@View({
  templateUrl: './app.html'
})

class App {
  target:string;
  constructor() {
    this.target = 'world';
  }
}

bootstrap(App);

