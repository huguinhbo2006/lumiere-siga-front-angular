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
  selector: 'ui-datepicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor {

  @Input() label = '';

  @Input() placeholder = 'Selecciona fecha';

  @Input() disabled = false;

  @Input() readonly = false;

  @Input() required = false;

  @Input() helper = '';

  @Input() error = '';

  @Input() minDate?: string;

  @Input() maxDate?: string;

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

    const input = event.target as HTMLInputElement;

    this.value = input.value;

    this.onChange(this.value);

    this.onTouched();

    this.valueChange.emit(this.value);
  }

  openCalendar(input: HTMLInputElement): void {

    if (this.disabled || this.readonly) return;

    input.showPicker();
  }

}