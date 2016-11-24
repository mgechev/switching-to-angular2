import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'fancy-button',
  template: '<button><ng-content></ng-content></button>'
})
class FancyButton { /* Extra behavior */ }

@Component({
  selector: 'panel',
  styles: [
    `.panel {
      width: auto;
      display: inline-block;
      border: 1px solid black;
    }
    .panel-title {
      border-bottom: 1px solid black;
      background-color: #eee;
    }
    .panel-content,
    .panel-title {
      padding: 5px;
    }`
  ],
  template: `
    <div class="panel">
      <div class="panel-title">
        <ng-content select=".panel-title"></ng-content>
      </div>
      <div class="panel-content">
        <ng-content select=".panel-content"></ng-content>
      </div>
    </div>`
})
class Panel { }

@Component({
  selector: 'app',
  template: `
    <fancy-button>
      <span>I will <i>be</i> projected</span>
    </fancy-button>
    <br>
    <panel>
      <section class="panel-title">Sample title</section>
      <section class="panel-content">Content</section>
    </panel>
  `
})
class App {
  constructor() {}
}

@NgModule({
  declarations: [Panel, FancyButton, App],
  imports: [BrowserModule],
  bootstrap: [App],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

