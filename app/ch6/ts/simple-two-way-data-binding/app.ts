import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {NgModel} from 'angular2/common';

@Component({
  selector: 'app',
  directives: [NgModel],
  template: `
    <input type="text" [(ngModel)]="name"/>
    <div>{{name}}</div>
  `,
})
class App {
  name: string;
}

bootstrap(App, []);
