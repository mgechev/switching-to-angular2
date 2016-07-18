import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AsyncRoute, Redirect, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from '@angular/router-deprecated';
import {DeveloperCollection} from './developer_collection';
import {Developer} from './developer';

@Component({
  selector: 'app',
  template: `
    <nav class="navbar navbar-default">
      <ul class="nav navbar-nav">
        <li><a [routerLink]="['/Home']">Home</a></li>
        <li><a [routerLink]="['/AddDeveloper']">Add developer</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers: [DeveloperCollection],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  new AsyncRoute({
    loader: () =>
      System.import('./home')
        .then(m => m.Home),
      name: 'Home',
      path: '/'
    }),
  new AsyncRoute({
    loader: () =>
      System.import('./add_developer')
        .then(m => m.AddDeveloper),
      name: 'AddDeveloper',
      path: '/dev-add'
    }),
//  new Route({ component: DeveloperDetails, name: 'DeveloperDetails', path: '/dev-details/:id/...' }),
  new Redirect({ path: '/add-dev', redirectTo: ['/dev-add'] })
])
class App {}

bootstrap(App, [
  ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]);
