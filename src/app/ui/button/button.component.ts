import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() variant:
    | 'primary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'secondary'
    | 'outline'
    = 'primary';

  @Input() size:
    | 'sm'
    | 'md'
    | 'lg'
    = 'md';

  @Input() disabled = false;

  @Input() loading = false;

  @Input() icon = '';

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {

    if (this.disabled || this.loading) {
      return;
    }

    this.clicked.emit();

  }

}