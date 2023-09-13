import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponent]'
})
export class InjectComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
