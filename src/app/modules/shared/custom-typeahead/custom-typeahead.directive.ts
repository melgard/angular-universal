import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2, ViewContainerRef} from '@angular/core';

import {ComponentLoaderFactory, TypeaheadDirective} from 'ngx-bootstrap';
import {NgControl} from '@angular/forms';

TypeaheadDirective.prototype.onChange = function (e) {
  // enter
  if (e.keyCode === 13 && e.target.value) {
    this.hide();
    return;
  }

  const value = e.target.value !== undefined
    ? e.target.value
    : e.target.textContent !== undefined
      ? e.target.textContent
      : e.target.innerText;

  if (value != null && value.trim().length >= this.typeaheadMinLength) {
    this.typeaheadLoading.emit(true);
    this.keyUpEventEmitter.emit(e.target.value);
  } else {
    this.typeaheadLoading.emit(false);
    this.typeaheadNoResults.emit(false);
    this.hide();
  }
};

TypeaheadDirective.prototype.onBlur = function () {
  if (this._container && !this._container.isFocused) {
    const activeValue = this._container.active;
    this.hide();
    this.typeaheadOnBlur.emit(activeValue);
  }
};

@Directive({
  selector: '[bpCustomTypeahead]'
})
export class CustomTypeaheadDirective extends TypeaheadDirective {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(control: NgControl,
              viewContainerRef: ViewContainerRef,
              element: ElementRef,
              renderer: Renderer2,
              cis: ComponentLoaderFactory,
              cdRef: ChangeDetectorRef) {
    super(
      control,
      element,
      viewContainerRef,
      renderer,
      cis,
      cdRef
    );
  }

  @HostListener('keydown', ['$event']) onSubmitAction(e) {
    // enter
    if (e.keyCode === 13 && e.target.value) {
      this.onSubmit.emit(e.target.value);
    }
  }
}
