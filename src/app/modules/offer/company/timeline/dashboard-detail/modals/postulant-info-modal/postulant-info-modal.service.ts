import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class PostulantInfoModalService {

  @Output() ModalHidded: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

}
