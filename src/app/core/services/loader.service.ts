import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading = signal(false);

  message = signal('Cargando...');

  show(message = 'Cargando...'): void {

    this.message.set(message);

    this.loading.set(true);
  }

  hide(): void {

    this.loading.set(false);
  }

}