import {NgModule, Component, Pipe, PipeTransform} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpModule, Http} from '@angular/http';

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
  template: '<greeting></greeting> <br> <timer></timer>'
})
class App {}

@NgModule({
  imports: [HttpModule, BrowserModule],
  declarations: [App, Greeting, Timer],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
