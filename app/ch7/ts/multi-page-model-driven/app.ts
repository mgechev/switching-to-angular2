import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {Route, Redirect, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from '@angular/router-deprecated';
import {Home} from './home';
import {DeveloperCollection} from './developer_collection';
import {Developer} from './developer';
import {GitHubGateway} from './github_gateway';
import {AddDeveloper} from './add_developer';
import {DeveloperDetails} from './developer_details';

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
  new Route({ component: Home, name: 'Home', path: '/' }),
  new Route({ component: AddDeveloper, name: 'AddDeveloper', path: '/dev-add' }),
  new Route({ component: DeveloperDetails, name: 'DeveloperDetails', path: '/dev-details/:id/...' }),
  new Redirect({ path: '/add-dev', redirectTo: ['/dev-add'] })
])
class App {}

bootstrap(App, [
  ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]);
