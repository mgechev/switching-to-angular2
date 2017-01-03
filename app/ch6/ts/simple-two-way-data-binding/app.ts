import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  template: `
    <input type="text" [(ngModel)]="name">
    <div>{{name}}</div>
  `
})
class App {
  name: string;
}

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
