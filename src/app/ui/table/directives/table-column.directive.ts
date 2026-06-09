import {
  Directive,
  Input,
  TemplateRef
} from '@angular/core';

@Directive({
  selector: '[tableColumn]',
  standalone: true
})
export class TableColumnDirective {

  @Input('tableColumn')
  key = '';

  constructor(
    public template: TemplateRef<any>
  ) {}

}