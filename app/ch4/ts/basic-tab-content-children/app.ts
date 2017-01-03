import {
  Directive,
  Inject,
  EventEmitter,
  Output,
  Component,
  forwardRef,
  Host,
  Attribute,
  ContentChildren,
  QueryList,
  NgModule
} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'tab-title',
  styles: [`
    .tab-title {
      display: inline-block;
      cursor: pointer;
      padding: 5px;
      border: 1px solid #ccc;
    }
  `],
  template: `
    <div class="tab-title" (click)="handleClick()">
      <ng-content></ng-content>
    </div>
  `
})
class TabTitle {
  @Output('selected')
  tabSelected: EventEmitter<TabTitle> = new EventEmitter<TabTitle>();
  handleClick() {
    this.tabSelected.emit(this);
  }
}

@Component({
  selector: 'tab-content',
  styles: [`
    .tab-content {
      border: 1px solid #ccc;
      border-top: none;
      padding: 5px;
    }
  `],
  template: `
    <div class="tab-content" [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `
})
class TabContent {
  isActive: boolean = false;
}

@Component({
  selector: 'tabs',
  styles: [
    `
      .tab {
        display: inline-block;
      }
      .tab-nav {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    `
  ],
  template: `
    <div class="tab">
      <div class="tab-nav">
        <ng-content select="tab-title"></ng-content>
      </div>
      <ng-content select="tab-content"></ng-content>
    </div>
  `
})
class Tabs {
  @Output('changed')
  tabChanged: EventEmitter<number> = new EventEmitter<number>();

  @ContentChildren(TabTitle)
  tabTitles: QueryList<TabTitle>;

  @ContentChildren(TabContent)
  tabContents: QueryList<TabContent>;

  active: number;

  select(index: number) {
    let contents: TabContent[] = this.tabContents.toArray();
    contents[this.active].isActive = false;
    this.active = index;
    contents[this.active].isActive = true;
    this.tabChanged.emit(index);
  }
  ngAfterContentInit() {
    this.tabTitles
      .map(t => t.tabSelected)
      .forEach((t, i) => {
        t.subscribe(_ => {
          this.select(i)
        });
      });
    this.active = 0;
    this.select(0);
  }
}

@Component({
  selector: 'app',
  template: `
    <tabs (changed)="tabChanged($event)">
      <tab-title>Tab 1</tab-title>
      <tab-content>Content 1</tab-content>
      <tab-title>Tab 2</tab-title>
      <tab-content>Content 2</tab-content>
    </tabs>
  `
})
class App {
  tabChanged(tab) {
    console.log(tab);
  }
}

@NgModule({
  declarations: [App, Tabs, TabContent, TabTitle],
  imports: [BrowserModule],
  bootstrap: [App],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

