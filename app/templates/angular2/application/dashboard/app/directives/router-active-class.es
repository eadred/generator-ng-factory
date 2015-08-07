import {Query, Host, QueryList, Dependency, Directive} from 'angular2/angular2';
import {ElementRef} from 'angular2/core';
import {Router, RouterLink, Location} from 'angular2/router';
import {Renderer} from 'angular2/src/render/api';
import {DOM} from 'angular2/src/dom/dom_adapter';

@Directive({
  selector: '[router-active-class]',
  properties: ['activeClass: router-active-class']
})
export class RouterActiveClass {
  constructor(@Query(RouterLink) dependencies: QueryList, _ngEl: ElementRef, _location: Location, _router: Router, _renderer: Renderer) {
    this._ngEl = _ngEl;
    this._location = _location;
    this._renderer = _renderer;
    this._router = _router;
    this._dependencies = dependencies;
    this._router.subscribe(this.onLocationChange.bind(this));
  }
  set activeClass(change) {
    this._activeClass = change && !isNaN(change) ? change : 'active';
  }
  onLocationChange(_navigationHref) {
    this._navigationHref = this._dependencies.first._navigationHref;
    let enabled = this._navigationHref.indexOf(this._location.path()) !== -1;
    this._renderer.setElementClass(this._ngEl, this._activeClass, enabled);
  }
}