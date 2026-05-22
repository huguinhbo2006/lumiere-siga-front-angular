import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

type InputValidation =
  | 'text'
  | 'number'
  | 'decimal'
  | 'rfc'
  | 'curp';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() label = '';

  @Input() placeholder = '';

  @Input() validation: InputValidation = 'text';

  @Input() maxLength = 255;

  @Input() disabled = false;

  @Input() required = false;

  @Input() uppercase = false;

  @Input() id = crypto.randomUUID();

  @Output() enter = new EventEmitter<string>();

  value = '';

  onChange = (value: string) => {};

  onTouched = () => {};

  writeValue(value: string): void {

    this.value = value || '';

  }

  registerOnChange(fn: any): void {

    this.onChange = fn;

  }

  registerOnTouched(fn: any): void {

    this.onTouched = fn;

  }

  setDisabledState(isDisabled: boolean): void {

    this.disabled = isDisabled;

  }

  onInput(event: Event): void {

    const input = event.target as HTMLInputElement;
  
    let value = input.value;
  
    if (this.uppercase) {
  
      value = value.toUpperCase();
  
    }
  
    value = this.sanitize(value);
  
    input.value = value;
  
    this.value = value;
  
    this.onChange(this.value);
  
  }

  onBlur(): void {

    this.onTouched();

  }

  onEnter(event: KeyboardEvent): void {

    if (event.key === 'Enter') {

      this.enter.emit(this.value);

    }

  }

  sanitize(value: string): string {

    switch (this.validation) {

      case 'number':
        return value.replace(/[^0-9]/g, '');

      case 'decimal':
        return value
          .replace(/[^0-9.]/g, '')
          .replace(/(\..*)\./g, '$1');

      case 'rfc':
        return value
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, '')
          .slice(0, 13);

      case 'curp':
        return value
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, '')
          .slice(0, 18);

      default:
        return value;

    }

  }

}