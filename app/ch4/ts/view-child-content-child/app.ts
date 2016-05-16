import {Component, Directive, ViewChildren, ContentChildren, QueryList} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

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
  template: '<user-badge></user-badge>',
  directives: [UserBadge]
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
  directives: [UserPanel, UserRating]
})
class App {
  constructor() {}
}

bootstrap(App);

