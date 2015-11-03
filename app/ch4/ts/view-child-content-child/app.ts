import {Component, Directive, ViewChildren, ContentChildren, QueryList, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';

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
  selector: 'user-pane',
  template: '<user-badge/>',
  directives: [UserBadge]
})
class UserPane {
  @ViewChildren(UserBadge)
  viewChildren: QueryList;

  @ContentChildren(UserRating)
  contentChildren: QueryList;

  afterViewInit() {
    // view children are initialized
  }

  afterContentInit() {
    // content children are initialized
  }
}


@Component({
  selector: 'app',
  template: '<user-pane><user-rating></user-pane>',
  directives: [CORE_DIRECTIVES, UserPane, UserRating]
})
class App {
  constructor() {}
}

bootstrap(App);

