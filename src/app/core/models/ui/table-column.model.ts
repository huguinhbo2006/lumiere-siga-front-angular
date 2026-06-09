export interface TableColumnModel {

  key: string;

  label: string;

  width?: string;

  align?: 'left' | 'center' | 'right';

  sortable?: boolean;

  type?:
    | 'text'
    | 'badge'
    | 'date'
    | 'currency'
    | 'actions';

  badgeVariant?:
    | 'success'
    | 'danger'
    | 'warning'
    | 'primary'
    | 'secondary';

  actions?: {
    icon: string;
    action: string;
    variant?: 'primary' | 'danger' | 'warning';
  }[];

}