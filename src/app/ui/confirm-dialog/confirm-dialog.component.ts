import {
  Component,
  HostListener,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  visible = input(false);

  title = input('Confirmar');
  message = input('¿Deseas continuar?');

  confirmText = input('Aceptar');
  cancelText = input('Cancelar');

  loading = input(false);

  type = input<'primary' | 'danger' | 'warning'>('primary');

  confirmed = output<void>();
  cancelled = output<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onBackdrop(event: MouseEvent): void {

    if ((event.target as HTMLElement).classList.contains('ui-confirm-dialog-overlay')) {
      this.onCancel();
    }

  }

  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (this.visible()) {
      this.onCancel();
    }

  }

}