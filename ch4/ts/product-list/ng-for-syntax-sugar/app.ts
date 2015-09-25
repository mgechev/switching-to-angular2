import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
  selector: 'app'
})
@View({
  templateUrl: './app.html',
  directives: [CORE_DIRECTIVES]
})

class App {
  products:string[];
  name:string;
  constructor() {
    this.name = "John";
    this.products = ['milk', "egs", "meat"];
  }
}

bootstrap(App);
