import {Component, Input, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'zippy-header',
  template: '<header>{{ header }}</header>',
  styles: [
    `
    header {
      cursor: pointer;
      border-bottom: 1px solid #ccc;
      font-size: 1.2em;
      background-color: #eee;
    }
    `
  ]
})
class ZippyHeader {
  @Input() header: string;
}

@Component({
  selector: 'zippy',
  template: `
    <section>
      <zippy-header (click)="visible = !visible" [header]="header"></zippy-header>
      <div *ngIf="visible">
        <ng-content select="content"></ng-content>
      </div>
    </section>
  `,
  styles: [
    `
    section {
      width: 300px;
      border: 1px solid #ccc;
    }
    `
  ]
})
class Zippy {
  @Input() header: string;
  visible = true;
}

@NgModule({
  declarations: [Zippy, ZippyHeader],
  imports: [CommonModule],
  exports: [Zippy]
})
class ZippyModule {}

@Component({
  selector: 'my-app',
  template: `
    <zippy header="Header">
      <content>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </content>
    </zippy>
  `
})
class App {
}

@NgModule({
  imports: [BrowserModule, ZippyModule],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

