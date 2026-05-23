import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {

  toast = inject(ToastService);

}