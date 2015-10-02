import {Component, View, bootstrap} from 'angular2/angular2';
@Component({
  selector: 'app'
})
@View({
  templateUrl: './ch4/ts/hello-world/app.html'
})

class App {
  target:string;
  constructor() {
    this.target = 'world';
  }
}

bootstrap(App);

