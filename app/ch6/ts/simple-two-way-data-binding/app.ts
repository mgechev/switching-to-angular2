import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {NgModel} from '@angular/common';

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
