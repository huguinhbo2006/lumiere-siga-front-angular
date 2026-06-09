export interface ToastModel {

  id: number;

  type: 'success' | 'error' | 'warning' | 'info';

  message: string;

}