import { Injectable, signal } from '@angular/core';

import { ToastModel } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts = signal<ToastModel[]>([]);

  private id = 0;

  success(message: string): void {

    this.show('success', message);
  }

  error(message: string): void {

    this.show('error', message);
  }

  warning(message: string): void {

    this.show('warning', message);
  }

  info(message: string): void {

    this.show('info', message);
  }

  remove(id: number): void {

    this.toasts.update(toasts =>
      toasts.filter(x => x.id !== id)
    );
  }

  private show(
    type: ToastModel['type'],
    message: string
  ): void {

    const toast: ToastModel = {

      id: ++this.id,

      type,

      message

    };

    this.toasts.update(toasts => [
      ...toasts,
      toast
    ]);

    setTimeout(() => {

      this.remove(toast.id);

    }, 4000);
  }

}