import {
  Component
} from '@angular/core';

import { CardComponent } from '../../../../ui/card/card.component';
import { TableComponent } from '../../../../ui/table/table.component';

import { TableColumnModel } from '../../../../core/models/ui/table-column.model';
import { TableConfigModel } from '../../../../core/models/ui/table-config.model';

import { TableColumnDirective } from '../../../../ui/table/directives/table-column.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    TableComponent,
    TableColumnDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  columns: TableColumnModel[] = [
    {
      key: 'usuario',
      label: 'Empleado',
      sortable: true
    },
    {
      key: 'estado',
      label: 'Estado',
      type: 'badge',
      align: 'center',
      badgeVariant: 'success',
      sortable: true
    },
    {
      key: 'rol',
      label: 'Rol',
      sortable: true
    },
    {
      key: 'acciones',
      label: 'Acciones',
      type: 'actions',
      align: 'center',
      actions: [
        {
          icon: 'fa-solid fa-pen',
          action: 'edit',
          variant: 'primary'
        },
        {
          icon: 'fa-solid fa-trash',
          action: 'delete',
          variant: 'danger'
        }
      ]
    }
  ];

  config: TableConfigModel = {
    hover: true,
    striped: true,
    searchable: true,
    selectable: true,
    stickyHeader: true,
    clickable: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
    allowAll: true
  };

  data = [
    {
      id: 1,
      nombre: 'Hugo Pérez',
      correo: 'hugo@email.com',
      estado: 'Activo',
      rol: 'Administrador',
      avatar: 'H'
    },
    {
      id: 2,
      nombre: 'Ana López',
      correo: 'ana@email.com',
      estado: 'Activo',
      rol: 'Ventas',
      avatar: 'A'
    },
    {
      id: 3,
      nombre: 'Carlos Ruiz',
      correo: 'carlos@email.com',
      estado: 'Inactivo',
      rol: 'Cobranza',
      avatar: 'C'
    },
    {
      id: 4,
      nombre: 'Laura Torres',
      correo: 'laura@email.com',
      estado: 'Activo',
      rol: 'Supervisor',
      avatar: 'L'
    },
    {
      id: 5,
      nombre: 'Miguel Castro',
      correo: 'miguel@email.com',
      estado: 'Activo',
      rol: 'Ventas',
      avatar: 'M'
    },
    {
      id: 6,
      nombre: 'Fernanda Díaz',
      correo: 'fernanda@email.com',
      estado: 'Inactivo',
      rol: 'Cobranza',
      avatar: 'F'
    },
    {
      id: 7,
      nombre: 'Daniel Gómez',
      correo: 'daniel@email.com',
      estado: 'Activo',
      rol: 'Administrador',
      avatar: 'D'
    }
  ];

  onRowClick(row: any): void {

    console.log('ROW CLICK');

    console.log(row);

  }

  onAction(event: any): void {

    console.log('ACTION');

    console.log(event);

  }

}