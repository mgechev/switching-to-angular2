import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {RouterModule} from '@angular/router';
// import {HomeModule} from './home';
import {DeveloperCollection} from './developer_collection';
import {Developer} from './developer';
// import {AddDeveloper} from './add_developer';

@Component({
  selector: 'app',
  template: `...`,
  providers: [DeveloperCollection]
})
class App {}

const routeModule = RouterModule.forRoot([
  {
    path: 'add-dev',
    redirectTo: 'dev-add'
  }
]);

@NgModule({
  declarations: [App],
  bootstrap: [App],
  imports: [BrowserModule, routeModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

