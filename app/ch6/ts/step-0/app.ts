import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {Route, Redirect, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from '@angular/router-deprecated';
// import {Home} from './home';
import {DeveloperCollection} from './developer_collection';
import {Developer} from './developer';
// import {AddDeveloper} from './add_developer';

@Component({
  selector: 'app',
  template: `...`,
  providers: [DeveloperCollection],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
//  new Route({ component: Home, name: 'Home', path: '/' }),
//  new Route({ component: AddDeveloper, name: 'AddDeveloper', path: '/dev-add' }),
//  new Route({ component: DeveloperDetails, name: 'DeveloperDetails', path: '/dev-details/:id/...' }),
  new Redirect({ path: '/add-dev', redirectTo: ['/dev-add'] })
])
class App {}

bootstrap(App, [
  ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]);
