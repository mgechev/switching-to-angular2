import {Component, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Route, Redirect, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, APP_BASE_HREF, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {Home} from './home';
import {DeveloperCollection} from './developer_collection';
import {Developer} from './developer';
import {AddDeveloper} from './add_developer';

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
//  new Route({ component: DeveloperDetails, name: 'DeveloperDetails', path: '/dev-details/:id/...' }),
  new Redirect({ path: '/add-dev', redirectTo: ['/dev-add'] })
])
class App {}

bootstrap(App, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(APP_BASE_HREF, {
    useValue: '/ch6/ts/multi-page/'
  }
)]);
