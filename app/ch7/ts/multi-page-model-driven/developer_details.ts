import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig, RouteParams} from '@angular/router-deprecated';
import {Developer} from './developer';
import {DeveloperCollection} from './developer_collection';
import {DeveloperBasicInfo} from './developer_basic_info';
import {DeveloperAdvancedInfo} from './developer_advanced_info';

@Component({
  selector: 'dev-details',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <section class="col-md-4">
      <ul class="nav nav-tabs">
        <li><a [routerLink]="['./DeveloperBasicInfo']">Basic profile</a></li>
        <li><a [routerLink]="['./DeveloperAdvancedInfo']">Advanced details</a></li>
      </ul>
      <router-outlet></router-outlet>
    </section>
  `,
})
@RouteConfig([
  { component: DeveloperBasicInfo, name: 'DeveloperBasicInfo', path: '/' },
  { component: DeveloperAdvancedInfo, name: 'DeveloperAdvancedInfo', path: '/dev-details-advanced' }
])
export class DeveloperDetails {
  public dev: Developer;
  constructor(routeParams: RouteParams, developers: DeveloperCollection) {
    this.dev = developers.getUserById(parseInt(routeParams.params['id']));
  }
}
