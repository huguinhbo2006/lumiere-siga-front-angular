import { Injectable, signal } from '@angular/core';
import { MenuModule } from '../../models/menu.model';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  modules = signal<MenuModule[]>([
    {
      nombre: 'Directivos',
      icono: 'fa-solid fa-user-tie',
      color: 'text-danger',

      opciones: [
        {
          nombre: 'Ingresos',
          icono: 'fa-solid fa-dollar-sign',
          color: 'text-success',
          ruta: '/ingresos'
        },
        {
          nombre: 'Reportes',
          icono: 'fa-solid fa-chart-line',
          color: 'text-primary',
          ruta: '/reportes'
        }
      ]
    },

    {
      nombre: 'Administración',
      icono: 'fa-solid fa-cog',
      color: 'text-warning',

      opciones: [
        {
          nombre: 'Usuarios',
          icono: 'fa-solid fa-users',
          color: 'text-info',
          ruta: '/usuarios'
        }
      ]
    }
  ]);

}