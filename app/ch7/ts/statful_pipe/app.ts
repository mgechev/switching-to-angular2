import {NgModule, Component, Pipe, PipeTransform} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModel} from '@angular/forms';
import {FetchJsonPipe} from './fetch_json_pipe';
import {HttpModule} from '@angular/http';

@Pipe({
  name: 'objectGet'
})
class ObjectGetPipe {
  transform(obj: Object, args: string[]) {
    if (obj) {
      return obj[args[0]];
    }
  }
}

@Component({
  selector: 'app',
  template: `
    <input type="text" #input>
    <button (click)="setUsername(input.value)">Get Avatar</button>
    <br>
    <img width="160" [src]="(('https://api.github.com/users/' + username) | fetchJson).avatar_url"/>
  `
})
class App {
  username: string;
  setUsername(user: string) {
    this.username = user;
  }
}

@NgModule({
  imports: [HttpModule, BrowserModule],
  declarations: [App, FetchJsonPipe, ObjectGetPipe],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
