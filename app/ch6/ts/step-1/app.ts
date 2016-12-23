import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Home} from './home';
import {DeveloperCollection} from './developer_collection';
import {AddDeveloper} from './add_developer';

@Component({
  selector: 'app',
  template: `
    <nav class="navbar navbar-default">
      <ul class="nav navbar-nav">
        <li><a [routerLink]="['home']">Home</a></li>
        <li><a [routerLink]="['dev-add']">Add developer</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers: [DeveloperCollection]
})
class App {}

const routingModule = RouterModule.forRoot([
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'dev-add',
    component: AddDeveloper
  },
  {
    path: 'add-dev',
    redirectTo: 'dev-add'
  }
]);

@NgModule({
  imports: [BrowserModule, routingModule],
  declarations: [App, Home, AddDeveloper],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
