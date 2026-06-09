import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutService } from '../../core/services/layout.service';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  openModule = '';

  layoutService = inject(LayoutService);

  menuService = inject(MenuService);

  get showLabels(): boolean {

    return this.layoutService.mode() === 'classic'
      && !this.layoutService.collapsed();

  }

  toggleModule(module: string) {

    if (this.openModule === module) {
      this.openModule = '';
      return;
    }
  
    this.openModule = module;
  
  }
}
