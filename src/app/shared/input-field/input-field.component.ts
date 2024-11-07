// input-field.component.ts
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() label: string = "";
  @Input() control = new FormControl(); // Permitir que control sea null
  @Input() type: string = 'text';
}
