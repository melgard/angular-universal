import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OnRemoveEvent} from './interfaces/OnRemoveElement';
import swal from 'sweetalert';

@Component({
  selector: 'app-chiplist',
  templateUrl: './chiplist.component.html',
})
export class ChipListComponent {

  @Output() onRemove: EventEmitter<OnRemoveEvent> = new EventEmitter<OnRemoveEvent>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() showCloseButton: boolean = false;
  @Input() isDraggable: boolean = false;
  @Input() values: string[] = [];

  @Input() confirmCloseTitle: string;
  @Input() confirmCloseText: string;

  close(index: number) {
    swal({
      title: this.confirmCloseTitle || '¿Remover valor?',
      text: this.confirmCloseText || 'Si acepta se eliminará el valor de la lista.',
      icon: 'info',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
      .then(() => {
        const removedElement = this.values.splice(index, 1)[0];
        this.onRemove.emit({index, removedElement, values: this.values});
        this.onChange.emit(this.values);
      });
  }
}
