import {Component, Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS, Http} from '@angular/http';

@Component({
  selector: 'greeting',
  template: 'Hello {{ greetingPromise | async }}'
})
class Greeting {
  username: string;
  greetingPromise = new Promise<string>(resolve => this.resolve = resolve);
  resolve: Function;
  constructor() {
    setTimeout(_ => {
      this.resolve('Foobar!');
    }, 3000);
  }
}

@Component({
  selector: 'timer',
  template: '{{ timer | async | date: "medium" }}'
})
class Timer {
  username: string;
  timer: Observable<number>;
  constructor() {
    let counter = 0;
    this.timer = Observable.create(observer => {
      setInterval(() => {
        observer.next(new Date().getTime());
      }, 1000);
    });
  }
}

@Component({
  selector: 'app',
  directives: [Greeting, Timer],
  template: '<greeting></greeting> <br> <timer></timer>'
})
class App {}

bootstrap(App, []);
