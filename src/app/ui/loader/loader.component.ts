import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'ui-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loader = inject(LoaderService);

}