import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {DeveloperCollection} from './developer_collection';
import {BooleanPipe} from './boolean_pipe';

import {HTTP_PROVIDERS} from 'angular2/http';

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
