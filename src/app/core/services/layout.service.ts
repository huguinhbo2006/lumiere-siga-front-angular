import { Injectable, signal } from '@angular/core';

import { SidebarMode } from '../models/layout/sidebar-mode.type';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  mode = signal<SidebarMode>('classic');

  collapsed = signal(false);

  isMobile = signal(false);

  isTablet = signal(false);

  isDesktop = signal(true);

  toggleSidebar(): void {

    this.collapsed.update(value => !value);

  }

  collapse(): void {

    this.collapsed.set(true);

  }

  expand(): void {

    this.collapsed.set(false);

  }

  setMode(mode: SidebarMode): void {

    this.mode.set(mode);

  }

  updateViewport(width: number): void {

    const isDesktop = width >= 1200;
    const isTablet = width >= 768 && width < 1200;
    const isMobile = width < 768;

    this.isDesktop.set(isDesktop);
    this.isTablet.set(isTablet);
    this.isMobile.set(isMobile);

    if (isDesktop) {
      this.setMode('classic');
      return;
    }

    if (isTablet) {
      this.setMode('rail');
      return;
    }

    this.setMode('floating');

  }

}
