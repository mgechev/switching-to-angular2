var Tabs = ng.Component({
  selector: 'tabs'
})
.View({
  template: `
    <div>
      <ul>
        <li *ngFor="#tab of tabs; #index=index" (click)="selectTab(index)">{{tab.tabTitle}}</li>
      </ul>
      <ng-content></ng-content>
    </div>
    `,
  directives: [ng.CORE_DIRECTIVES]
})
.Class({
  constructor: function () {
    this.tabs = [];
  },
  addTab: function (tab) {
    var total = this.tabs.length;
    this.tabs.push(tab);
    return total;
  },
  selectTab(idx) {
    this.tabs.forEach(function (t) {
      t.setActive(false);
    });
    this.tabs[idx].setActive(true);
  }
});

var Tab = ng.Component({
  selector: 'tab',
  properties: ['tabTitle']
})
.View({
  template: `<div [hidden]="!isActive()">
      <ng-content></ng-content>
    </div>`
})
.Class({
  constructor: [[ng.Inject(Tabs), ng.Host()], function (tabs) {
    this.active = !tabs.addTab(this);
  }],
  setActive: function (isActive) {
    this.active = isActive;
  },
  isActive: function () {
    return this.active;
  }
});

var App = ng.Component({
  selector: 'app'
})
.View({
  templateUrl: './app.html',
  directives: [Tab, Tabs]
})
.Class({
  constructor: function () {}
});

ng.bootstrap(App, []);
