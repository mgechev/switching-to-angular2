import {NgModule, Component, Directive, ViewChildren, ContentChildren, QueryList} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'user-badge',
  template: '<h2>View child</h2>'
})
class UserBadge {}

@Component({
  selector: 'user-rating',
  template: '<h2>Content child</h2>'
})
class UserRating {}

@Component({
  selector: 'user-panel',
  template: '<user-badge></user-badge>'
})
class UserPanel {
  @ViewChildren(UserBadge)
  viewChildren: QueryList<UserBadge>;

  @ContentChildren(UserRating)
  contentChildren: QueryList<UserRating>;

  ngAfterViewInit() {
    // view children are initialized
  }

  ngAfterContentInit() {
    // content children are initialized
  }
}


@Component({
  selector: 'app',
  template: '<user-panel><user-rating></user-rating></user-panel>',
})
class App {
  constructor() {}
}

@NgModule({
  declarations: [App, UserBadge, UserPanel, UserRating],
  imports: [BrowserModule],
  bootstrap: [App],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

