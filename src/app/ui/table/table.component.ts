import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableColumnModel } from '../../models/table-column.model';

import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() columns: TableColumnModel[] = [];

  @Input() data: any[] = [];

  @Input() loading = false;

  @Input() striped = false;

  @Input() hover = true;

  @Input() clickable = false;

  @Input() searchable = true;

  @Input() selectable = false;

  @Input() pageSize = 10;

  @Input() pageSizeOptions: (number | string)[] = [
    5,
    10,
    20,
    50
  ];

  @Input() allowAll = true;

  @Output() rowClicked = new EventEmitter<any>();

  @Output() actionClicked = new EventEmitter<{
    action: string;
    row: any;
  }>();

  search = '';

  sortColumn = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  page = 1;

  selectedRows: any[] = [];

  get finalPageOptions(): (number | string)[] {

    const options = [...this.pageSizeOptions];

    if (this.allowAll) {
      options.push('Todos');
    }

    return options;

  }

  get filteredData(): any[] {

    let result = [...this.data];

    if (this.search.trim()) {

      const term = this.search.toLowerCase();

      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(term)
        )
      );

    }

    if (this.sortColumn) {

      result.sort((a, b) => {

        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }

        if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }

        return 0;

      });

    }

    return result;

  }

  get paginatedData(): any[] {

    if (this.pageSize === -1) {
      return this.filteredData;
    }

    const start = (this.page - 1) * this.pageSize;

    return this.filteredData.slice(
      start,
      start + this.pageSize
    );

  }

  get totalPages(): number {

    if (this.pageSize === -1) {
      return 1;
    }

    return Math.ceil(
      this.filteredData.length / this.pageSize
    );

  }

  onPageSizeChange(value: any): void {

    if (value === 'Todos') {

      this.pageSize = -1;

    } else {

      this.pageSize = Number(value);

    }

    this.page = 1;

  }

  onSort(column: TableColumnModel): void {

    if (!column.sortable) {
      return;
    }

    if (this.sortColumn === column.key) {

      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : 'asc';

    } else {

      this.sortColumn = column.key;

      this.sortDirection = 'asc';

    }

  }

  onRowClick(row: any): void {

    if (!this.clickable) {
      return;
    }

    this.rowClicked.emit(row);

  }

  onAction(action: string, row: any): void {

    this.actionClicked.emit({
      action,
      row
    });

  }

  toggleRow(row: any): void {

    const exists = this.selectedRows.includes(row);

    if (exists) {

      this.selectedRows =
        this.selectedRows.filter(r => r !== row);

      return;

    }

    this.selectedRows.push(row);

  }

  toggleAll(): void {

    if (this.selectedRows.length === this.paginatedData.length) {

      this.selectedRows = [];

      return;

    }

    this.selectedRows = [...this.paginatedData];

  }

  isSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  getCellValue(item: any, key: string): any {
    return item[key];
  }

}