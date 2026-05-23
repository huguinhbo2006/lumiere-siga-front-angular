import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {

  @Input() open = false;

  @Input() title = '';

  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input() closeOnBackdrop = true;

  @Input() closeOnEscape = true;

  @Output() closed = new EventEmitter<void>();

  close(): void {

    this.closed.emit();
  }

  backdropClick(event: MouseEvent): void {

    if (!this.closeOnBackdrop) return;

    if ((event.target as HTMLElement).classList.contains('ui-modal')) {

      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {

    if (!this.open) return;

    if (!this.closeOnEscape) return;

    this.close();
  }

}