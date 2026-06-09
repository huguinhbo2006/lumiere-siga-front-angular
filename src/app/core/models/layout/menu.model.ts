export interface MenuModule {

  nombre: string;

  icono: string;

  color: string;

  opciones: MenuOption[];

}

export interface MenuOption {

  nombre: string;

  icono: string;

  color: string;

  ruta: string;

}