import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAutoNext]',
})
export class AutoNextDirective {
  @Input('appAutoNext') appAutoNext: any;

  @HostListener('input', ['$event.target']) onInput(input: any) {
    const length = input.value.length;
    const maxLength = input.attributes.maxlength.value;
    if (length >= maxLength) {
      this.appAutoNext.focus();
    }
  }
}
