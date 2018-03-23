import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent {

  @Output() onRemove: EventEmitter<void> = new EventEmitter<void>();
  @Input() value: string;
  @Input() showCloseButton: boolean = false;
  @Input() isDraggable: boolean = false;

  close() {
    this.onRemove.emit();
  }
}
