import {Directive, Component, View, Host, Attribute, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'tabs',
  directives: [CORE_DIRECTIVES]
  styles: [
    `
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
        <li *ng-for="#tab of tabs; #index = index"
          [class.is-active]="active == index"
          (click)="select(index)">
          {{tab.title}}
        </li>
      </ul>
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
class Tabs {
  tabs: Tab[];
  active: number;
  constructor() {
    this.tabs = [];
    this.active = 0;
  }
  addTab(tab: Tab) {
    if (this.tabs.length === this.active) {
      tab.isActive = true;
    }
    this.tabs.push(tab);
  }
  select(index) {
    this.active = index;
    this.tabs.forEach(t => t.isActive = false);
    this.tabs[index].isActive = true;
  }
}

@Component({
  selector: `tab`,
  template: `
    <div [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `
})
class Tab {
  isActive: boolean;
  constructor(@Host(Tabs) private tabs: Tabs, @Attribute('title') private title: string) {
    this.tabs.addTab(this);
  }
}

@Component({
  selector: 'app',
  template: `
    <tabs>
      <tab title="Tab 1">
        Content 1
      </tab>
      <tab title="Tab 2">
        Content 2
      </tab>
    </tabs>
  `,
  directives: [Tab, Tabs, CORE_DIRECTIVES]
})
class App {}

bootstrap(App);

