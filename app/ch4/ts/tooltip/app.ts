import {Injectable, ElementRef, Attribute, Inject, Directive, Component, View, bootstrap} from 'angular2/angular2';

class Overlay {
  private el:HTMLElement;
  constructor(text) {
    var el = document.createElement('div');
    el.className = 'tooltip';
    el.innerHTML = text;
    this.el = el;
  }
  close() {
    this.el.hidden = true;
  }
  open(el) {
    this.el.hidden = false;
    var rect = el.getBoundingClientRect();
    this.el.style.left = rect.left + 'px';
    this.el.style.top = rect.top + 'px';
  }
  attach(target) {
    target.appendChild(this.el);
  }
  detach() {
    this.el.parentNode.removeChild(this.el);
  }
}

@Injectable()
class OverlayManager {
  private pool:{[id:string]:Overlay[]};
  constructor() {
    this.pool = {};
  }
  get(text):Overlay {
    if (this.pool[text]) {
      return this.pool[text].pop();
    }
    var overlay = new Overlay(text);
    overlay.close();
    overlay.attach(document.body);
    return overlay;
  }
  free(overlay) {
    var text = overlay.text;
    this.pool[text] = this.pool[text] || [];
    this.pool[text].push(overlay);
    overlay.detach();
  }
}

@Directive({
  selector: '[tooltip]',
  properties: ['tooltip'],
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class Tooltip {
  private overlay:Overlay;
  constructor(@Attribute('tooltip') tooltip, private el:ElementRef, manager: OverlayManager) {
    this.el = el;
    this.overlay = manager.get(tooltip);
  }
  onMouseEnter() {
    this.overlay.open(this.el.nativeElement);
  }
  onMouseLeave() {
    this.overlay.close();
  }
}

@Component({
  selector: 'app'
})
@View({
  templateUrl: '<%= currentPath %>app.html',
  directives: [Tooltip]
})
class App {}

bootstrap(App, [OverlayManager]);
