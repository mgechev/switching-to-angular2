import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DeveloperCollection} from './developer_collection';
import {BooleanPipe} from './boolean_pipe';

import {HTTP_PROVIDERS} from '@angular/http';

@Component({
  selector: 'home',
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS],
  pipes: [BooleanPipe],
  templateUrl: './home.html'
})
export class Home {
  constructor(private developers: DeveloperCollection) {}
  getDevelopers() {
    return this.developers.getAll();
  }
}
