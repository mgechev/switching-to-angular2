import {Component, ElementRef, NgModule, ViewChild} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as markdown from 'markdown';

let instance: Markdown;

class Markdown {
  toHTML(md) {
    return markdown.toHTML(md);
  }
}

@Component({
  selector: 'markdown-panel',
  styles: [
    `.panel {
      width: auto;
      display: inline-block;
      border: 1px solid black;
    }
    .panel-title-wrapper {
      border-bottom: 1px solid black;
      background-color: #eee;
    }
    .panel-content-wrapper,
    .panel-title-wrapper {
      padding: 5px;
    }`
  ],
  template: `
    <div class="panel">
      <div class="panel-title-wrapper">
        <ng-content select=".panel-title"></ng-content>
      </div>
      <div class="panel-content-wrapper">
        <ng-content select=".panel-content"></ng-content>
      </div>
    </div>`
})
class MarkdownPanel {
  constructor(private el: ElementRef, private md: Markdown) {}
  ngAfterContentInit() {
    instance = this.md;
    let el = this.el.nativeElement;
    let title = el.querySelector('.panel-title');
    let content = el.querySelector('.panel-content');
    title.innerHTML = this.md.toHTML(title.innerHTML);
    content.innerHTML = this.md.toHTML(content.innerHTML);
  }
}

@Component({
  selector: 'app',
  template: `
    <markdown-panel>
      <section class="panel-title">### Small title</section>
      <section class="panel-content">
## Sample title
* First point
* Second point
      </section>
    </markdown-panel>
    <btn>**Click me**</btn>
  `
})
class App {
  constructor() {}
}

@Component({
  selector: 'btn',
  template: '<button #btn><ng-content></ng-content></button>'
})
class Button {
  @ViewChild('btn') button: ElementRef;

  constructor(private md: Markdown) {}

  ngAfterContentInit() {
    const el = this.button.nativeElement;
    el.innerHTML = this.md.toHTML(el.innerHTML);
    console.log(instance === this.md);
  }
}

@NgModule({
  declarations: [Button],
  exports: [Button],
  providers: [Markdown],
})
class ButtonModule {}

@NgModule({
  declarations: [App, MarkdownPanel],
  imports: [BrowserModule, ButtonModule],
  bootstrap: [App],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

