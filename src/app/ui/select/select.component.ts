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

import { SelectModel } from '../../models/select.model';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  @Input() label = '';

  @Input() placeholder = 'Selecciona una opción';

  @Input() options: SelectModel[] = [];

  @Input() disabled = false;

  @Input() readonly = false;

  @Input() required = false;

  @Input() helper = '';

  @Input() error = '';

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() valueChange = new EventEmitter<any>();

  value: any = '';

  onChange: any = () => {};

  onTouched: any = () => {};

  writeValue(value: any): void {

    this.value = value;
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

  handleChange(event: Event): void {

    const select = event.target as HTMLSelectElement;

    this.value = select.value;

    this.onChange(this.value);

    this.onTouched();

    this.valueChange.emit(this.value);
  }

}