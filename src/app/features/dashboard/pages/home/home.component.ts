import { Component } from '@angular/core';
import { CardComponent } from '../../../../ui/card/card.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../ui/button/button.component';
import { InputComponent } from '../../../../ui/input/input.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, CommonModule, ButtonComponent, InputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
