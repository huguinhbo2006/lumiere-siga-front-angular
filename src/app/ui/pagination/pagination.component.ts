import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() page = 1;

  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  previous(): void {

    if (this.page <= 1) {
      return;
    }

    this.pageChange.emit(this.page - 1);

  }

  next(): void {

    if (this.page >= this.totalPages) {
      return;
    }

    this.pageChange.emit(this.page + 1);

  }

}