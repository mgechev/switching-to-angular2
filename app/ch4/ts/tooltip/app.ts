import {Injectable, ElementRef, Inject, Directive, Component, View, bootstrap} from 'angular2/angular2';

class Overlay {
  private el:HTMLElement;
  constructor() {
    var el = document.createElement('div');
    el.className = 'tooltip';
    this.el = el;
  }
  close() {
    this.el.hidden = true;
  }
  open(el, text) {
    this.el.innerHTML = text;
    this.el.hidden = false;
    var rect = el.nativeElement.getBoundingClientRect();
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
  inputs: ['tooltip'],
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class Tooltip {
  private overlay:Overlay;
  constructor(private el:ElementRef, manager: OverlayManager) {
    this.el = el;
    this.overlay = manager.get();
  }
  onMouseEnter() {
    this.overlay.open(this.el, this.tooltip);
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
