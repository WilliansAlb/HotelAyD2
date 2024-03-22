import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() cancelTitle: string = 'Cancelar';
  @Input() saveTitle: string = 'Guardar';
  @Input() cancelRoute!: any[] | string;
  @Output() saveAction = new EventEmitter<void>();

  get showSave() {
    return this.saveAction.observed;
  }

  get showCancel() {
    return !!this.cancelRoute;
  }
}
