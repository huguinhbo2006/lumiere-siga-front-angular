import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableColumnModel } from '../../models/table-column.model';
import { TableConfigModel } from '../../models/table-config.model';

import { PaginationComponent } from '../pagination/pagination.component';

import { TableColumnDirective } from './directives/table-column.directive';

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

  @Input() config: TableConfigModel = {
    hover: true,
    striped: false,
    searchable: true,
    selectable: false,
    stickyHeader: false,
    clickable: false,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
    allowAll: true
  };

  @Output() rowClicked = new EventEmitter<any>();

  @Output() actionClicked = new EventEmitter<{
    action: string;
    row: any;
  }>();

  @Output() searchChanged = new EventEmitter<string>();

  @Output() sortChanged = new EventEmitter<{
    column: string;
    direction: string;
  }>();

  search = '';

  sortColumn = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  page = 1;

  selectedRows: any[] = [];

  @ContentChildren(TableColumnDirective)
  customTemplates!: QueryList<TableColumnDirective>;

  get finalPageOptions(): (number | string)[] {

    const options = [
      ...(this.config.pageSizeOptions || [])
    ];

    if (this.config.allowAll) {
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
          String(value)
            .toLowerCase()
            .includes(term)
        )
      );

    }

    if (this.sortColumn) {

      result.sort((a, b) => {

        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (valueA < valueB) {
          return this.sortDirection === 'asc'
            ? -1
            : 1;
        }

        if (valueA > valueB) {
          return this.sortDirection === 'asc'
            ? 1
            : -1;
        }

        return 0;

      });

    }

    return result;

  }

  get paginatedData(): any[] {

    if (this.config.pageSize === -1) {
      return this.filteredData;
    }

    const start =
      (this.page - 1) *
      this.config.pageSize!;

    return this.filteredData.slice(
      start,
      start + this.config.pageSize!
    );

  }

  get totalPages(): number {

    if (this.config.pageSize === -1) {
      return 1;
    }

    return Math.ceil(
      this.filteredData.length /
      this.config.pageSize!
    );

  }

  onSearch(): void {

    this.page = 1;

    this.searchChanged.emit(this.search);

  }

  onPageSizeChange(value: any): void {

    if (value === 'Todos') {

      this.config.pageSize = -1;

    } else {

      this.config.pageSize = Number(value);

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

    this.sortChanged.emit({
      column: this.sortColumn,
      direction: this.sortDirection
    });

  }

  onRowClick(row: any): void {

    if (!this.config.clickable) {
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

    const exists =
      this.selectedRows.includes(row);

    if (exists) {

      this.selectedRows =
        this.selectedRows.filter(
          r => r !== row
        );

      return;

    }

    this.selectedRows.push(row);

  }

  toggleAll(): void {

    if (
      this.selectedRows.length ===
      this.paginatedData.length
    ) {

      this.selectedRows = [];

      return;

    }

    this.selectedRows = [
      ...this.paginatedData
    ];

  }

  isSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  getCellValue(item: any, key: string): any {
    return item[key];
  }

  getCustomTemplate(
    key: string
  ): TableColumnDirective | undefined {

    return this.customTemplates.find(
      template => template.key === key
    );

  }

}