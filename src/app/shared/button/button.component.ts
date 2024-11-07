import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() color: string = 'primary'; // color del botón
  @Input() label: string = 'Button'; // texto del botón
  @Input() disabled: boolean = false; // para deshabilitar el botón
}
