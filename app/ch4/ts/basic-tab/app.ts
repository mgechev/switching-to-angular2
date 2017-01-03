import {
  Directive,
  Inject,
  EventEmitter,
  Output,
  Input,
  Component,
  forwardRef,
  Host,
  NgModule
} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

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
  @Input()
  public title: string;
  constructor(@Inject(forwardRef(() => Tabs)) @Host() private tabs: Tabs) {
    this.tabs.addTab(this);
  }
}

@Component({
  selector: 'tabs',
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
        <li *ngFor="let tab of tabs; let index = index"
          [class.is-active]="active == index" (click)="select(index)">
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
  @Output('changed')
  private tabChanged: EventEmitter<Tab> = new EventEmitter<Tab>();
  private tabs: Tab[];
  private active: number;
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
    this.tabs[this.active].isActive = false;
    this.active = index;
    this.tabs[index].isActive = true;
    this.tabChanged.emit(this.tabs[index]);
  }
}

@Component({
  selector: 'app',
  template: `
    <tabs (changed)="tabChanged($event)">
      <tab title="Tab 1">
        Content 1
      </tab>
      <tab title="Tab 2">
        Content 2
      </tab>
    </tabs>
  `
})
class App {
  tabChanged(tab) {
    console.log(tab);
  }
}


@NgModule({
  declarations: [App, Tabs, Tab],
  imports: [BrowserModule],
  bootstrap: [App],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

