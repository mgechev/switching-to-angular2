import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DeveloperCollection} from './developer_collection';

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
  `
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
    loadChildren: './home#HomeModule'
  },
  {
    path: 'dev-add',
    loadChildren: './add_developer#AddDeveloperModule'
  }
]);

@NgModule({
  imports: [BrowserModule, routingModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DeveloperCollection],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
