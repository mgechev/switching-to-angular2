import {Component, ElementRef} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import * as markdown from 'markdown';

class Markdown {
  toHTML(md) {
    return markdown.toHTML(md);
  }
}

@Component({
  selector: 'markdown-panel',
  viewProviders: [Markdown],
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
        <ng-content select="panel-title"></ng-content>
      </div>
      <div class="panel-content">
        <ng-content select="panel-content"></ng-content>
      </div>
    </div>`
})
class MarkdownPanel {
  constructor(private el: ElementRef, private md: Markdown) {}
  ngAfterContentInit() {
    let el = this.el.nativeElement;
    let title = el.querySelector('panel-title');
    let content = el.querySelector('panel-content');
    title.innerHTML = this.md.toHTML(title.innerHTML);
    content.innerHTML = this.md.toHTML(content.innerHTML);
  }
}

@Component({
  selector: 'app',
  template: `
    <markdown-panel>
      <panel-title>### Small title</panel-title>
      <panel-content>
## Sample title
* First point
* Second point
      </panel-content>
    </markdown-panel>
  `,
  directives: [MarkdownPanel]
})
class App {
  constructor() {}
}

bootstrap(App);
