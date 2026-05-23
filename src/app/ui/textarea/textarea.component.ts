import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {

  @Input() label = '';

  @Input() placeholder = 'Escribe aquí';

  @Input() disabled = false;

  @Input() readonly = false;

  @Input() required = false;

  @Input() helper = '';

  @Input() error = '';

  @Input() rows = 4;

  @Input() maxlength?: number;

  @Input() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() valueChange = new EventEmitter<string>();

  value = '';

  onChange: any = () => {};

  onTouched: any = () => {};

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

  handleInput(event: Event): void {

    const textarea = event.target as HTMLTextAreaElement;

    this.value = textarea.value;

    this.onChange(this.value);

    this.onTouched();

    this.valueChange.emit(this.value);
  }

}