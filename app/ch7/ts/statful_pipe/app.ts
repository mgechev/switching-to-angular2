import {Component, Pipe, PipeTransform} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {NgModel} from '@angular/common';
import {FetchJsonPipe} from './fetch_json_pipe';
import {HTTP_PROVIDERS} from '@angular/http';

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
  providers: [HTTP_PROVIDERS],
  pipes: [FetchJsonPipe, ObjectGetPipe],
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

bootstrap(App, []);
