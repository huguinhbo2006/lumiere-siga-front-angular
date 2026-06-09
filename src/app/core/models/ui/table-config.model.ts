export interface TableConfigModel {

  hover?: boolean;

  striped?: boolean;

  searchable?: boolean;

  selectable?: boolean;

  stickyHeader?: boolean;

  clickable?: boolean;

  pageSize?: number;

  pageSizeOptions?: (number | string)[];

  allowAll?: boolean;

}