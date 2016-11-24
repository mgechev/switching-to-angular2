var Tabs = ng.core.Component({
  selector: 'tabs',
  styles: [`
      .tab {
        display: inline-block;
      }
      .tab-header {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .tab-header .is-active {
        background-color: #eee;
      }
      .tab-header li {
        display: inline-block;
        cursor: pointer;
        padding: 5px;
        border: 1px solid #ccc;
      }
      .tab-content {
        border: 1px solid #ccc;
        border-top: none;
        padding: 5px;
      }
    `
  ],
  template: `
    <div class="tab">
      <ul class="tab-header">
        <li *ngFor="let tab of tabs; let index=index" (click)="selectTab(index)">{{tab.tabTitle}}</li>
      </ul>
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
    `
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

var Tab = ng.core.Component({
  selector: 'tab',
  inputs: ['tabTitle'],
  template: `<div [hidden]="!isActive()">
      <ng-content></ng-content>
    </div>`
})
.Class({
  constructor: [[ng.core.Inject(Tabs), ng.core.Host()], function (tabs) {
    this.active = !tabs.addTab(this);
  }],
  setActive: function (isActive) {
    this.active = isActive;
  },
  isActive: function () {
    return this.active;
  }
});

var App = ng.core.Component({
  selector: 'app',
  templateUrl: './app.html'
})
.Class({
  constructor: function () {}
});


var AppModule = ng.core.NgModule({
  imports: [ng.platformBrowser.BrowserModule],
  declarations: [App, Tab, Tabs],
  bootstrap: [App]
})
.Class({
  constructor: function () {}
});

ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);

