import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button [type]="type">{{ label }}</button>`,
  styles: [`button { padding: 10px; }`]
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: string = 'button';
}
