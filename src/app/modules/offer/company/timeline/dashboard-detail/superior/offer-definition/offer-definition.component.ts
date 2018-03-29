import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {fadeIn} from '@app/modules/shared/animations/animations';
import {Observable} from 'rxjs/Observable';
import {Offer} from '@app/models/offer.model';

// TODO Este es el import que tenia la version anterior
// import { Offer } from '../../../../../../wall/model/offer';

@Component({
  selector: 'app-offer-definition',
  templateUrl: './offer-definition.component.html',
  styleUrls: ['./offer-definition.component.scss'],
  animations: [fadeIn]
})
export class OfferDefinitionComponent implements AfterContentInit {

  @Input() offer: Observable<Offer>;
  @Output() onEdit: EventEmitter<Offer> = new EventEmitter<Offer>();
  @Output() onPause: EventEmitter<Offer> = new EventEmitter<Offer>();
  @Output() onDelete: EventEmitter<Offer> = new EventEmitter<Offer>();

  constructor() {
  }

  ngAfterContentInit() {
  }

  public editOffer(offer: Offer) {
    this.onEdit.emit(offer);
  }

  public pauseOffer(offer: Offer) {
    this.onPause.emit(offer);
  }

  public deleteOffer(offer: Offer) {
    this.onDelete.emit(offer);
  }

}
