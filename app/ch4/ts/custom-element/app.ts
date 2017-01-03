import {Component, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    The current time is <simple-timer></simple-timer>
  `
})
class App {
  name: string = 'John Doe';
}

@NgModule({
  imports: [BrowserModule],
  declarations: [App],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

