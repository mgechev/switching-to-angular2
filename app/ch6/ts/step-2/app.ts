import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Home} from './home';
import {DeveloperCollection} from './developer_collection';
import {AddDeveloper} from './add_developer';
import {ControlErrors} from './control_errors';
import {EmailValidator} from './email_validator';

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
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    component: Home,
    path: 'home'
  },
  {
    component: AddDeveloper, 
    path: 'dev-add'
  },
  {
    path: 'add-dev',
    redirectTo: 'dev-add',
  }
]);

@NgModule({
  imports: [BrowserModule, FormsModule, routingModule],
  declarations: [App, Home, AddDeveloper, ControlErrors, EmailValidator],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
