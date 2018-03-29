import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from 'app/models/index.models';

@Component({
  selector: 'app-timeline-offer-data-management',
  templateUrl: './offer-data-management.component.html',
  styleUrls: ['./offer-data-management.component.scss']
})
export class OfferDataManagementComponent implements OnInit {

  @Input() offer: Offer;
  @Output() onEdit: EventEmitter<Offer> = new EventEmitter<Offer>();
  @Output() onDelete: EventEmitter<Offer> = new EventEmitter<Offer>();
  @Output() onPause: EventEmitter<Offer> = new EventEmitter<Offer>();

  constructor() {
  }

  ngOnInit() {
  }

  Pause(offer: Offer) {
    this.onPause.emit(offer);
  }

  Edit(offer: Offer) {
    this.onEdit.emit(offer);
  }

  Delete(offer: Offer) {
    this.onDelete.emit(offer);
  }

}
