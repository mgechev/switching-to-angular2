import {Component, CORE_DIRECTIVES, ElementRef, bootstrap} from 'angular2/angular2';
import * as markdowm from '/lib/markdown';

class Markdown {
  toHTML(md) {
    return markdown.toHTML(md);
  }
}

@Component({
  selector: 'markdown-pane',
  viewProviders: [Markdown],
  styles: [
    `.pane {
      width: auto;
      display: inline-block;
      border: 1px solid black;
    }
    .pane-title {
      border-bottom: 1px solid black;
      background-color: #eee;
    }
    .pane-content,
    .pane-title {
      padding: 5px;
    }`
  ],
  template: `
    <div class="pane">
      <div class="pane-title">
        <ng-content select="pane-title"></ng-content>
      </div>
      <div class="pane-content">
        <ng-content select="pane-content"></ng-content>
      </div>
    </div>`
})
class MarkdownPane {
  constructor(private el: ElementRef, private md: Markdown) {}
  afterContentInit() {
    let el = this.el.nativeElement;
    let title = el.querySelector('pane-title');
    let content = el.querySelector('pane-content');
    title.innerHTML = this.md.toHTML(title.innerHTML);
    content.innerHTML = this.md.toHTML(content.innerHTML);
  }
}

@Component({
  selector: 'app',
  template: `
    <markdown-pane>
      <pane-title>### Small title</pane-title>
      <pane-content>
## Sample title
* First point
* Second point
      </pane-content>
    </markdown-pane>
  `,
  directives: [CORE_DIRECTIVES, MarkdownPane]
})
class App {
  constructor() {}
}

bootstrap(App);
